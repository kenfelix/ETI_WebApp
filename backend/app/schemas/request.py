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


class PostUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    content: Optional[Any] = None
    imageURL: Optional[str] = None
    published: Optional[bool] = None
