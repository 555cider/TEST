from flask import Blueprint, render_template, redirect, request, session
from flask_login import login_user, logout_user, login_required
from bcrypt import hashpw, gensalt, checkpw
from email_validator import validate_email, EmailNotValidError
import re

from models import Auth
from db import Session

auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/')
def home():
    if 'user_id' in session:
        return redirect('/book/list')
    else:
        return redirect('/login')


@auth.route('/login', methods=['GET'])
def get_login():
    if 'user_id' in session:
        return redirect('/book/list')
    else:
        return render_template('auth/login.html')


@auth.route('/login', methods=['POST'])
def post_login():
    email = request.form['email']
    password = request.form['password']
    auth = Session.query(Auth).filter(Auth.email == email).first()
    if not auth:
        return render_template('auth/login.html', message='해당 정보와 일치하는 회원이 없습니다.')
    if not checkpw(password.encode('utf-8'), auth.password.encode('utf-8')):
        return render_template('auth/login.html', message='비밀번호가 일치하지 않습니다.')
    login_user(auth, remember=True)
    session['user_id'] = auth.id
    return redirect('/book/list')


@auth.route('/logout', methods=['GET'])
@login_required
def get_logout():
    logout_user()
    session.clear()
    return redirect('/')


@auth.route('/register', methods=['GET'])
def get_register():
    if 'user_id' in session:
        return redirect('/book/list')
    else:
        return render_template('auth/register.html')


@auth.route('/register', methods=['POST'])
def post_register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    password_re = request.form['password-re']

    # 이름 검증
    if not validate_name(name):
        return render_template('/auth/register.html', message='이름은 한글과 영문만 입력할 수 있습니다.')

    # 이메일 검증
    if Session.query(Auth).filter(Auth.email == email).first():
        return render_template('/auth/register.html', message='이미 사용 중인 이메일입니다.')
    try:
        validate_email(email)
    except EmailNotValidError as e:
        return render_template('/auth/register.html', message=str(e))

    # 비밀번호 검증
    if password != password_re:
        return render_template('/auth/register.html', message='비밀번호가 일치하지 않습니다.')
    pw_is_valid = validate_password(password)
    if not pw_is_valid['valid']:
        return render_template('/auth/register.html', message=pw_is_valid['message'])

    pw_hash = hashpw(password.encode('utf-8'), gensalt())
    Session.add(Auth(name, email, pw_hash))
    Session.commit()
    return redirect('/auth/login')


def validate_name(name):
    reg = '[가-힣a-zA-Z]+'
    return bool(re.match(re.compile(reg), name))


def validate_password(password):
    reg_eng = '[a-zA-Z]'
    reg_num = '[0-9]'
    reg_sym = '[,./<>?;:{}`=~!@#$%^&*()_+|₩\-\'\"\[\]]'
    pw_eng = re.findall(re.compile(reg_eng), password)
    pw_num = re.findall(re.compile(reg_num), password)
    pw_sym = re.findall(re.compile(reg_sym), password)
    pw_type_cnt = [len(pw_eng) == 0, len(pw_num) == 0,
                   len(pw_sym) == 0].count(False)

    if len(pw_eng)+len(pw_num)+len(pw_sym) != len(password):
        return {'valid': False, 'message': '비밀번호로 허용되는 특수문자는 ,.;:\'\"`<>()\{\}[]~?!@#$%^&*_+-=|/ 입니다.'}
    elif not ((pw_type_cnt == 2 and len(password) >= 10) or (pw_type_cnt == 3 and len(password) >= 8)):
        return {'valid': False, 'message': '비밀번호는 영문, 숫자, 특수문자 중 "2종류로 10자리 이상" 또는 "3종류로 8자리 이상"이어야 합니다.'}
    else:
        return {'valid': True, 'message': ''}
