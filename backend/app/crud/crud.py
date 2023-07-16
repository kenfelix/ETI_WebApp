import os
import uuid

import pymongo
from fastapi import UploadFile
from PIL import Image

from ..config.config import get_db
from ..models.users import *
from ..schemas.request import Post as requestPost
from ..schemas.request import PostUpdate
from ..schemas.request import User as requestUser
from ..schemas.response import ImageURL, PyObjectId
from ..utils.utils import hashpassword, slugify

db = get_db()


def get_user(id: PyObjectId):
    return db.user.find_one({"_id": id})


def get_user_by_email(email: str):
    return db.user.find_one({"email": email})


def get_users():
    return db.user.find()


def delete_user(id: PyObjectId):
    return db.user.delete_one({"_id": id})


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


def update_user_password(id: PyObjectId, password: str):
    hashed_password = hashpassword(password=password)
    new_user_Indb = db.user.find_one_and_update(
        {"_id": id}, {"$set": {"password": hashed_password}}
    )
    return new_user_Indb


def create_post(post: requestPost):
    new_post: Post = Post(**post.dict())
    post_id = db.post.insert_one(dict(new_post))
    new_post_Indb = db.post.find_one({"_id": post_id.inserted_id})
    return new_post_Indb


def update_post(id: PyObjectId, post: PostUpdate):
    updatePost = dict(post)
    updatePost = {k: v for k, v in updatePost.items() if v is not None}
    if 'title' in updatePost:
        updatePost['slug'] = slugify(updatePost['title'])
    result = db.post.find_one_and_update(
        {"_id": id},
        {"$set": updatePost},
        upsert=True,
        return_document=pymongo.ReturnDocument.AFTER,
    )
    return result


def get_post_by_slug(slug: str):
    return db.post.find_one({"slug": slug})


def get_post_by_id(id: str):
    return db.post.find_one({"_id": id})


def get_posts(skip: Optional[int], limit: Optional[int]):
    if skip is None and limit is None:
        return db.post.find()
    else:
        return db.post.find().limit(limit).skip(skip)


def delete_post(id: PyObjectId):
    return db.post.delete_one({"_id": id})


def upload_image(
    image: UploadFile,
    folderName: str,
):
    _, f_ext = os.path.splitext(image.filename)
    randon_uid = uuid.uuid5(uuid.uuid4(), name=image.filename)
    picture_name = str(randon_uid) + f_ext

    path = os.path.join("static", folderName)

    if not os.path.exists(path):
        os.makedirs(path)

    picture_path = os.path.join(path, picture_name)

    output_size = (125, 125)
    img = Image.open(image.file)

    img.thumbnail(output_size)
    img.save(picture_path)
    imageURL: ImageURL = ImageURL(imageURL=f'{"static"}/{folderName}/{picture_name}')
    db.images.insert_one(imageURL.dict())

    return ImageURL(imageURL=f'{"static"}/{folderName}/{picture_name}')
