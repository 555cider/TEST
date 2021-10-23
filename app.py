from flask import Flask, render_template, request

from db import Connect

app = Flask(__name__)

client = Connect.get_connection()
db = client.get_database("delivery")
collection = db.get_collection("food")


project = {
    "_id": 0,
    "NAME": 1,
    "MENU_MAIN": 1,
    "MENU_SUB": 1,
    "DISTRICT_GU": 1,
    "DISTRICT_DONG": 1,
}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/intro", methods=["GET"])
def get_intro():
    return render_template("intro.html")


@app.route("/search", methods=["GET"])
def get_search():
    return render_template("search.html")


@app.route("/summary", methods=["GET"])
def get_summary():
    return render_template("summary.html")


# 지역(구) 클릭 시, 지역(구) 목록
@app.route("/category/district-gu", methods=["GET"])
def get_district_gu():
    result = collection.distinct("DISTRICT_GU")
    return {"districtGuList": result}


# 지역(구) 선택 시, 지역(동) 목록 갱신
@app.route("/category/district-gu", methods=["POST"])
def post_district_gu():
    district_gu = request.form["districtGu"]
    result = collection.distinct(
        "DISTRICT_DONG",
        filter={
            "DISTRICT_GU": district_gu,
        },
    )
    return {"districtDongList": result}


# 메뉴(메인) 클릭 시, 메뉴(메인) 목록
@app.route("/category/menu-main", methods=["GET"])
def get_menu_main():
    result = collection.distinct("MENU_MAIN")
    return {"menuMainList": result}


# 메뉴(메인) 선택 시, 메뉴(서브) 목록 갱신
@app.route("/category/menu-main", methods=["POST"])
def post_menu_main():
    menu_main = request.form["menuMain"]
    result = collection.distinct(
        "MENU_SUB",
        filter={
            "MENU_MAIN": menu_main,
        },
    )
    return {"menuSubList": result}


@app.route("/search", methods=["POST"])
def post_filter():
    chk = request.form["chk"]
    menu_main = (
        request.form["menu"].split(" > ")[0] if request.form["menu"] != None else ""
    )
    menu_sub = (
        request.form["menu"].split(" > ")[1] if request.form["menu"] != None else ""
    )
    district_gu = (
        request.form["district"].split(" ")[0]
        if request.form["district"] != None
        else ""
    )
    district_dong = (
        request.form["district"].split(" ")[1]
        if request.form["district"] != None
        else ""
    )
    # name = request.form["name"] if request.form["name"] != None else ""

    result = list(
        collection.find(
            filter={
                "MENU_MAIN": menu_main,
                "MENU_SUB": menu_sub,
                "DISTRICT_GU": district_gu,
                "DISTRICT_DONG": district_dong,
                "DATE_END": None,
            },
            projection=project,
        )
    )

    chart_data = []
    total = 0
    # 메뉴만 선택 시
    if chk == "1":
        chart_data = list(
            collection.aggregate(
                [
                    {
                        "$match": {
                            "MENU_MAIN": menu_main,
                            "DATE_END": {"$exists": False},
                        }
                    },
                    {
                        "$group": {
                            "_id": {
                                "name": {
                                    "$concat": ["$DISTRICT_GU", " ", "$DISTRICT_DONG"]
                                }
                            },
                            "count": {"$sum": 1},
                        }
                    },
                    {"$match": {"_id.name": {"$exists": True}}},
                    {"$sort": {"count": -1}},
                    {"$limit": 10},
                ]
            )
        )

        total = list(
            collection.aggregate(
                [
                    {
                        "$match": {
                            "MENU_MAIN": menu_main,
                            "DATE_END": {"$exists": False},
                        }
                    },
                    {"$group": {"_id": "$MENU_MAIN", "count": {"$sum": 1}}},
                ]
            )
        )[0]["count"]

    # 지역만 선택 시
    elif chk == "2":
        chart_data = list(
            collection.aggregate(
                [
                    {
                        "$match": {
                            "DISTRICT_GU": district_gu,
                            "DISTRICT_DONG": district_dong,
                            "DATE_END": {"$exists": False},
                        }
                    },
                    {
                        "$group": {
                            "_id": {
                                "name": {
                                    "$concat": [
                                        "$MENU_MAIN",
                                        " > ",
                                        {"$ifNull": ["$MENU_SUB", "기타"]},
                                    ]
                                }
                            },
                            "count": {"$sum": 1},
                        }
                    },
                    {"$match": {"_id.name": {"$exists": True}}},
                    {"$sort": {"count": -1}},
                    {"$limit": 10},
                ]
            )
        )

        total = list(
            collection.aggregate(
                [
                    {
                        "$match": {
                            "DISTRICT_GU": district_gu,
                            "DATE_END": {"$exists": False},
                        }
                    },
                    {"$group": {"_id": "$DISTRICT_GU", "count": {"$sum": 1}}},
                ]
            )
        )[0]["count"]

    # 그 외
    else:
        chart_data = [chk]

    return {"result": result, "chart_data": chart_data, "total": total}


# 오류 처리
@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=27017, debug=True)
