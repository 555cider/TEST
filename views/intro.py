from flask import Blueprint, render_template

intro = Blueprint("intro", __name__, url_prefix="/intro")


@intro.route("/", methods=["GET"])
def get_intro():
    return render_template("intro.html")
