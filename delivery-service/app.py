from flask import Flask, render_template

from views.index import index
from views.intro import intro
from views.search import search
from views.summary import summary

app = Flask(__name__)

app.register_blueprint(index)
app.register_blueprint(intro)
app.register_blueprint(search)
app.register_blueprint(summary)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=27017, debug=True)
