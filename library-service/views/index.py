from flask import Blueprint, redirect, render_template, session

index = Blueprint('index', __name__, url_prefix='/')


@index.route('/')
def home():
    if session.get('user_id'):
        return redirect('/auth/login')
    else:
        return redirect('/book/list')


@index.errorhandler(404)
def not_found(e):
    return render_template('error/404.html'), 404


@index.errorhandler(405)
def unauthorized(e):
    return render_template('error/405.html'), 405


@index.errorhandler(500)
def internal_server_error(e):
    return render_template('error/500.html'), 500


@index.errorhandler(502)
def bad_gateway(e):
    return render_template('error/502.html'), 502
