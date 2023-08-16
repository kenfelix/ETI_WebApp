from datetime import datetime
from typing import Any, Optional

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    password: str
    confirmed: bool
    privilege: int
    created_at: Optional[datetime]
    timestamp: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "test@eti.com",
                "password": "fakehashedsecret",
                "confirmed": False,
                "authorization": 1,
            }
        }


class Post(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    slug: str
    category: str
    content: Any
    imageURL: str
    published: bool
    created_at: Optional[datetime]
    timestamp: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PostCategoryResponse(BaseModel):
    label: str
    value: str


class Project(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    slug: str
    category: str
    content: Any
    imageURL: str
    raised: int
    goal: int
    currency: str
    published: bool
    created_at: Optional[datetime]
    timestamp: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ProjectCategoryResponse(BaseModel):
    label: str
    value: str


class Deleted(BaseModel):
    deleted: bool


class ImageURL(BaseModel):
    imageURL: str


class DonationResponse(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tx_ref: str
    email: EmailStr
    phone_number: str
    name: str
    donor: str
    amount: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
