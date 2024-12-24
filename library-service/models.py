from datetime import date, datetime
from flask_login.mixins import UserMixin
from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.sqltypes import DECIMAL, Boolean

Base = declarative_base()


class Auth(Base, UserMixin):
    __tablename__ = 'auth'
    id = Column(Integer,  primary_key=True,
                nullable=False, autoincrement=True)
    name = Column(String(64), nullable=False)
    email = Column(String(64), nullable=False, unique=True)
    password = Column(String(64), nullable=False)
    registered_date = Column(DateTime, nullable=False, default=datetime.now())

    def __init__(self, name, email, password, registered_date=datetime.now()):
        self.name = name
        self.email = email
        self.password = password
        self.registered_date = registered_date

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


class Book(Base):
    __tablename__ = 'book'
    id = Column(Integer,  primary_key=True,
                nullable=False, autoincrement=True)
    title = Column(String(64), nullable=False)
    publisher = Column(String(32), nullable=False)
    author = Column(String(64), nullable=False)
    published_date = Column(Date, nullable=False, default=date.today())
    pages = Column(Integer, nullable=False)
    isbn = Column(String(64), nullable=False)
    description = Column(String(64), nullable=False)
    link = Column(String(128), nullable=False)
    cover = Column(String(512), nullable=True)
    shelved_date = Column(Date, nullable=False, default=date.today())
    rented = Column(Boolean, nullable=False)
    rating = Column(DECIMAL(2, 1), nullable=True, default=0.0)

    def __init__(self, title, publisher, author, published_date, pages, isbn, description, link, cover, shelved_date, rented, rating):
        self.title = title
        self.publisher = publisher
        self.author = author
        self.published_date = published_date
        self.pages = pages
        self.isbn = isbn
        self.description = description
        self.link = link
        self.cover = cover
        self.shelved_date = shelved_date
        self.rented = rented
        self.rating = rating


class Rental(Base):
    __tablename__ = 'rental'
    id = Column(Integer, primary_key=True,
                nullable=False, autoincrement=True)
    auth_id = Column(Integer, ForeignKey('auth.id'), nullable=False)
    book_id = Column(Integer, ForeignKey('book.id'), nullable=False)
    rented_date = Column(DateTime, nullable=False,
                         default=datetime.now())
    returned_date = Column(DateTime, nullable=True)

    def __init__(self, auth_id, book_id):
        self.auth_id = auth_id
        self.book_id = book_id
        self.rented_date = datetime.now()
        self.returned_date = datetime.min


class Comment(Base):
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True,
                nullable=False, autoincrement=True)
    auth_id = Column(Integer, ForeignKey('auth.id'), nullable=False)
    book_isbn = Column(Integer, ForeignKey('book.id'), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(String(256), nullable=False)
    commented_date = Column(DateTime, nullable=False,
                            default=datetime.now())

    def __init__(self, auth_id, book_id, rating, comment, commented_date=datetime.now()):
        self.auth_id = auth_id
        self.book_isbn = book_id
        self.rating = rating
        self.comment = comment
        self.commented_date = commented_date
