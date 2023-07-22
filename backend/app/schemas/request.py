from typing import Any, Optional

from pydantic import BaseModel, EmailStr, Field

from app.schemas.response import PyObjectId


class User(BaseModel):
    email: EmailStr
    password: str


class Post(BaseModel):
    title: str
    category: str
    content: Any
    imageURL: str
    published: bool = False

class PostCategory(BaseModel):
    label: str
    value: str


class PostUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    content: Optional[Any] = None
    imageURL: Optional[str] = None
    published: Optional[bool] = None


class Project(BaseModel):
    title: str
    category: str
    content: Any
    imageURL: str
    raised: int
    goal: int
    currency: str
    published: bool = False

class ProjectCategory(BaseModel):
    label: str
    value: str


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    content: Optional[Any] = None
    imageURL: Optional[str] = None
    raised: Optional[int] = None
    goal: Optional[int] = None
    currency: Optional[str] = None
    published: Optional[bool] = None
