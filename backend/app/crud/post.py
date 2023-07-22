import pymongo

from ..config.config import get_db
from ..models.users import *
from ..schemas.request import Post as requestPost, PostCategory
from ..schemas.request import PostUpdate
from ..schemas.request import User as requestUser
from ..schemas.response import ImageURL, PyObjectId
from ..utils.utils import slugify

db = get_db()


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


def create_post_category(postCategory: PostCategory):
    new_post_category: PostCategory = PostCategory(**postCategory.dict())
    db.post_category.create_index([("label", pymongo.ASCENDING), ("value", pymongo.ASCENDING)], unique=True)
    post_category_id = db.post_category.insert_one(dict(new_post_category))
    new_post_category_Indb = db.post_category.find_one({"_id": post_category_id.inserted_id})
    return new_post_category_Indb


def get_post_categories():
    return db.post_category.find()

def get_ImageURLs():
    return db.images.find()