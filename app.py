from os import urandom
from flask import Flask
from flask_login import LoginManager

from views.index import index
from views.auth import auth
from views.book import book
from views.rental import rental
from models import Auth
from db import Session

app = Flask(__name__)

app.register_blueprint(index)
app.register_blueprint(auth)
app.register_blueprint(book)
app.register_blueprint(rental)

app.secret_key = urandom(24)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/auth/login'


@login_manager.user_loader
def load_user(user_id):
    return Session.query(Auth).filter(Auth.id == user_id).first()


@app.teardown_appcontext
def teardown_db(error):
    Session.remove()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
