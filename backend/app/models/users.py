from datetime import datetime
from typing import Optional
from ..utils.utils import slugify

from pydantic import BaseModel, EmailStr


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
    content: str
    image: str
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
