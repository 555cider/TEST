from pymongo import MongoClient


class Connect(object):
    @staticmethod
    def get_connection():
        return MongoClient("localhost", 27017)


client = Connect.get_connection()
db = client.get_database("delivery")
collection = db.get_collection("food")
