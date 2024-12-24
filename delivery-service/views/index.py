from flask import Blueprint, render_template

index = Blueprint("index", __name__, url_prefix="/")


@index.route("/", methods=["Get"])
def get_index():
    return render_template("index.html")


# 오류 처리
@index.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


# @index.errorhandler(405)
# def unauthorized(e):
#     return render_template('error/405.html'), 405


# @index.errorhandler(500)
# def internal_server_error(e):
#     return render_template('error/500.html'), 500


# @index.errorhandler(502)
# def bad_gateway(e):
#     return render_template('error/502.html'), 502
