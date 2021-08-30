from flask import Blueprint, render_template, redirect, abort, request, session
from flask_login import login_required
from sqlalchemy import func

from models import Book, Auth, Comment
from db import Session

book = Blueprint('book', __name__, url_prefix='/book')


@book.route('/')
@book.route('/list', methods=['GET'])
def get_list():
    curr_page = int(request.args.get('page')
                    ) if request.args.get('page') else 0
    books_left = Session.query(Book.id, Book.isbn, func.count(Book.id).label('qty_left')) \
        .filter(Book.rented == 0) \
        .group_by(Book.isbn) \
        .subquery()
    books = Session.query(Book.title, Book.isbn, Book.cover, Book.rating, books_left.c.qty_left, func.count(Book.id).label('qty_all')) \
        .group_by(Book.isbn) \
        .join(books_left, Book.isbn == books_left.c.isbn, isouter=True)
    book_list = books.limit(8).offset(curr_page*8)

    books_per_page = 8
    book_cnt = books.count()
    page_cnt = int(book_cnt/books_per_page)
    page_list = [curr_page]
    idx = 1
    while len(page_list) < 9:
        if curr_page+idx < page_cnt:
            page_list.append(curr_page+idx)
        if curr_page-idx >= 0:
            page_list.insert(0, curr_page-idx)
        idx += 1
        if idx > page_cnt:
            break

    return render_template('book/list.html', book_list=book_list, page_list=page_list, page_info=[curr_page, page_cnt])


@book.route('/detail', methods=['GET'])
def get_book():
    book_isbn = request.args.get('isbn')
    if not book_isbn:
        return abort(404, '해당 책이 존재하지 않습니다.')
    book = Session.query(Book).filter(Book.isbn == book_isbn).first()
    comments = Session.query(Comment.comment, Comment.commented_date, Comment.rating) \
        .filter(Comment.book_isbn == book_isbn).all()
    emails = Session.query(Auth.email) \
        .join(Comment, Auth.id == Comment.auth_id)
    return render_template('book/detail.html', book=book, comment_list=zip(comments, emails))


@book.route('/comment', methods=['POST'])
@login_required
def post_comment():
    auth_id = session.get('user_id')
    book_isbn = request.form['isbn']
    rating = request.form['rating']
    comment = request.form['comment']

    commented = Session.query(Comment) \
        .filter(Comment.book_isbn == book_isbn, Comment.auth_id == auth_id).first()
    if commented.count() != 0:
        commented.update({'rating': rating, 'comment': comment})
        ratings = Session.query(Comment.rating) \
            .filter(Comment.book_isbn == book_isbn).all()
        avg_rating = round((sum(ratings)-commented.rating +
                           int(rating)) / (len(ratings)))
        Session.query(Book).filter(Book.isbn == book_isbn) \
            .update({'rating': avg_rating})
    else:
        Session.add(Comment(auth_id, book_isbn, rating, comment))
        ratings = Session.query(Comment.rating).filter(
            Comment.book_isbn == book_isbn).all()
        avg_rating = round((sum(ratings)+int(rating)) / (len(ratings)+1))
        Session.query(Book).filter(Book.isbn == book_isbn) \
            .update({'rating': avg_rating})        
    Session.commit()
    return redirect(f'/book/detail?isbn={book_isbn}')
