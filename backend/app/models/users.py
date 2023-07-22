from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, EmailStr, Field

from app.schemas.response import PyObjectId

from ..utils.utils import slugify


class User(BaseModel):
    email: EmailStr
    password: str
    confirmed: bool = False
    privilege: int = 1
    created_at: Optional[datetime] = datetime.utcnow()
    timestamp: Optional[datetime] = datetime.timestamp(datetime.utcnow())


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: EmailStr


class Post(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    content: Any
    imageURL: str
    published: bool = False
    created_at: Optional[datetime]
    timestamp: Optional[datetime]

    def __init__(self, **data):
        super().__init__(**data)
        if self.slug is None:
            self.slug = slugify(self.title)
        if self.created_at is None:
            self.created_at = datetime.utcnow()
        if self.timestamp is None:
            self.timestamp = datetime.timestamp(datetime.utcnow())


class UpdatePost(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    content: Any
    imageURL: str
    published: bool = False
    timestamp: Optional[datetime]

    def __init__(self, **data):
        super().__init__(**data)
        if self.slug is None:
            self.slug = slugify(self.title)
        if self.timestamp is None:
            self.timestamp = datetime.timestamp(datetime.utcnow())


class Project(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    content: Any
    imageURL: str
    raised: int
    goal: int
    currency: str
    published: bool = False
    created_at: Optional[datetime]
    timestamp: Optional[datetime]

    def __init__(self, **data):
        super().__init__(**data)
        if self.slug is None:
            self.slug = slugify(self.title)
        if self.created_at is None:
            self.created_at = datetime.utcnow()
        if self.timestamp is None:
            self.timestamp = datetime.timestamp(datetime.utcnow())


class UpdateProject(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    content: Any
    imageURL: str
    raised: int
    goal: int
    currency: str
    published: bool = False
    timestamp: Optional[datetime]

    def __init__(self, **data):
        super().__init__(**data)
        if self.slug is None:
            self.slug = slugify(self.title)
        if self.timestamp is None:
            self.timestamp = datetime.timestamp(datetime.utcnow())
