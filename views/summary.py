from flask import Blueprint, render_template

summary = Blueprint("summary", __name__, url_prefix="/summary")


@summary.route("/", methods=["GET"])
def get_summary():
    return render_template("summary.html")
