import pymongo

from ..config.config import get_db
from ..models.users import *
from ..schemas.request import User as requestUser
from ..schemas.request import Post as requestPost
from ..schemas.response import PyObjectId
from ..utils.utils import hashpassword

db = get_db()


def get_user(id: PyObjectId):
    return db.user.find_one({"_id": id})


def get_user_by_email(email: str):
    return db.user.find_one({"email": email})


def get_users(skip: int, limit: int):
    return db.user.find().limit(limit).skip(skip)


def create_user(user: requestUser):
    hashed_password = hashpassword(password=user.password)
    new_user: User = User(
        email=user.email,
        password=hashed_password,
    )
    db.user.create_index([("email", pymongo.ASCENDING)], unique=True)
    user_id = db.user.insert_one(dict(new_user))
    new_user_Indb = db.user.find_one({"_id": user_id.inserted_id})
    return new_user_Indb


def create_post(post: requestPost):
    new_post: Post = Post(**post.dict())
    post_id = db.post.insert_one(dict(new_post))
    new_post_Indb = db.post.find_one({"_id": post_id.inserted_id})
    return new_post_Indb


def get_post_by_slug(slug: str):
    return db.post.find_one({"slug": slug})


def get_posts(skip: int, limit: int):
    return db.post.find().limit(limit).skip(skip)
