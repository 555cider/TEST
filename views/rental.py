from datetime import datetime
from flask import Blueprint, json, render_template, jsonify, session, request
from flask_login import login_required
from sqlalchemy import func

from models import Book, Rental
from db import Session

rental = Blueprint('rental', __name__, url_prefix='/rental')


@rental.route('/rental', methods=['POST'])
@login_required
def post_rent():
    if Session.query(func.count(Book.id)).filter(Book.rented == 0).group_by(Book.isbn) == 0:
        return jsonify(message='모두 대여 중입니다.')

    auth_id = session.get('user_id')
    book_isbn = json.loads(request.data).get('isbn')
    rented_book_id = Session.query(Book.id) \
        .filter(Rental.auth_id == auth_id, Rental.returned_date == datetime.min) \
        .join(Rental, Book.id == Rental.book_id).all()
    if Session.query(Rental.id).filter(Rental.auth_id == auth_id, Rental.book_id in rented_book_id).count() != 0:
        return jsonify(message='해당 도서는 이미 대여 중입니다.')

    book_id = Session.query(Book.id) \
        .filter(Book.isbn == book_isbn, Book.rented == 0).first()[0]
    Session.add(Rental(auth_id, book_id))
    Session.query(Book).filter(Book.id == book_id).update({'rented': 1})
    Session.commit()
    return jsonify(message='대여하였습니다.')


@rental.route('/return', methods=['POST'])
@login_required
def post_return():
    auth_id = session.get('user_id')
    book_id = json.loads(request.data).get('id')
    Session.query(Rental).filter(Rental.auth_id == auth_id, Rental.book_id == book_id) \
        .update({'returned_date': datetime.now()})
    Session.query(Book).filter(Book.id == book_id).update({'rented': 0})
    Session.commit()
    return jsonify(message='반납하였습니다.')


@rental.route('/rented', methods=['GET'])
@login_required
def get_rented():
    book_list = Session.query(Book.id, Book.title, Book.isbn, Book.cover, Book.rating, Rental.rented_date, Rental.returned_date) \
        .filter(Rental.auth_id == session.get('user_id'), Rental.returned_date == datetime.min) \
        .join(Book, Book.id == Rental.book_id).all()
    return render_template('rental/rented.html', book_list=book_list)


@ rental.route('/returned', methods=['GET'])
@ login_required
def get_returned():
    book_list = Session.query(Book.id, Book.title, Book.isbn, Book.cover, Book.rating, Rental.rented_date, Rental.returned_date) \
        .filter(Rental.auth_id == session.get('user_id'), Rental.returned_date != datetime.min) \
        .join(Book, Book.id == Rental.book_id).all()
    return render_template('rental/returned.html', book_list=book_list)
