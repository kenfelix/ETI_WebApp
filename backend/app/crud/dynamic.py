import os
from typing import Dict
import uuid

import pymongo
from fastapi import HTTPException, UploadFile, status
from PIL import Image

from ..config.config import get_db
from ..models.users import *
from ..schemas.response import ImageURL

db = get_db()


def create_page_content(pageContent: Dict):
    page = get_page_content_by_page(page=pageContent.get("page"))
    if page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Page already Created"
        )
    db.dynamic.create_index([("page", pymongo.ASCENDING)], unique=True)
    pageContent_id = db.dynamic.insert_one(pageContent)
    new_pageContent_Indb = db.dynamic.find_one({"_id": pageContent_id.inserted_id})
    return new_pageContent_Indb


def update_page_content(page: str, pageContent: Dict):
    updatepageContent = dict(pageContent)
    result = db.dynamic.find_one_and_update(
        {"page": page},
        {"$set": updatepageContent},
        upsert=True,
        return_document=pymongo.ReturnDocument.AFTER,
    )
    return result


def get_page_content_by_page(page: str):
    return db.dynamic.find_one({"page": page})

def upload_photo_book(
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
    db.photos.insert_one(imageURL.dict())

    return ImageURL(imageURL=f'{"static"}/{folderName}/{picture_name}')


def get_ImageURLs():
    return db.photos.find()

def delete_image(imageURL: str):
    try:
    # Use the os.remove() method to delete the file
        os.remove(imageURL)
        db.photos.delete_one({"imageURL": imageURL})

    except FileNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="could not delete photo")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="could not delete photo")