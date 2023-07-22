import pymongo

from ..config.config import get_db
from ..models.users import *
from ..schemas.request import Project as requestProject, ProjectCategory
from ..schemas.request import ProjectUpdate
from ..schemas.request import User as requestUser
from ..schemas.response import ImageURL, PyObjectId
from ..utils.utils import slugify

db = get_db()


def create_project(project: requestProject):
    new_project: Project = Project(**project.dict())
    project_id = db.project.insert_one(dict(new_project))
    new_project_Indb = db.project.find_one({"_id": project_id.inserted_id})
    return new_project_Indb


def update_project(id: PyObjectId, project: ProjectUpdate):
    updateproject = dict(project)
    updateproject = {k: v for k, v in updateproject.items() if v is not None}
    if 'title' in updateproject:
        updateproject['slug'] = slugify(updateproject['title'])
    result = db.project.find_one_and_update(
        {"_id": id},
        {"$set": updateproject},
        upsert=True,
        return_document=pymongo.ReturnDocument.AFTER,
    )
    return result


def get_project_by_slug(slug: str):
    return db.project.find_one({"slug": slug})


def get_project_by_id(id: str):
    return db.project.find_one({"_id": id})


def get_projects(skip: Optional[int], limit: Optional[int]):
    if skip is None and limit is None:
        return db.project.find()
    else:
        return db.project.find().limit(limit).skip(skip)


def delete_project(id: PyObjectId):
    return db.project.delete_one({"_id": id})


def create_project_category(projectCategory: ProjectCategory):
    new_project_category: ProjectCategory = ProjectCategory(**projectCategory.dict())
    db.project_category.create_index([("label", pymongo.ASCENDING), ("value", pymongo.ASCENDING)], unique=True)
    project_category_id = db.project_category.insert_one(dict(new_project_category))
    new_project_category_Indb = db.project_category.find_one({"_id": project_category_id.inserted_id})
    return new_project_category_Indb


def get_project_categories():
    return db.project_category.find()

def get_ImageURLs():
    return db.images.find()