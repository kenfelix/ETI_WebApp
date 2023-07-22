import os
import uuid

import pymongo
from fastapi import UploadFile
from PIL import Image

from ..config.config import get_db
from ..models.users import *
from ..schemas.request import Post as requestPost, PostCategory
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

    img = Image.open(image.file)
    img.save(picture_path)
    imageURL: ImageURL = ImageURL(imageURL=f'{"static"}/{folderName}/{picture_name}')
    db.images.insert_one(imageURL.dict())

    return ImageURL(imageURL=f'{"static"}/{folderName}/{picture_name}')
