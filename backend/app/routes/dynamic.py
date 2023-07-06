from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.crud.crud import create_post, get_post_by_slug, get_posts
from app.schemas.request import Post as postRequest
from app.schemas.response import Post as postResponse
from app.schemas.response import User as userResponse
from app.utils.oauth2 import create_access_token
from app.utils.enums import Privilege
from app.utils.dependecies import get_current_user

blog = APIRouter(tags=["Blog"])

@blog.post("/", status_code=status.HTTP_201_CREATED, response_model=postResponse)
async def createPost(post: postRequest, current_user: Annotated[userResponse, Depends(get_current_user)]):
    if not current_user.confirmed:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address.")
    if current_user.privilege < Privilege.STAFF.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!")
    new_post_Indb = create_post(post=post)
    return new_post_Indb


@blog.get("/{slug}", status_code=status.HTTP_200_OK, response_model=postResponse)
async def getPost(slug: str):
    new_post_Indb = get_post_by_slug(slug=slug)
    return new_post_Indb

@blog.get("/", status_code=status.HTTP_200_OK, response_model=List[postResponse])
async def getPosts(skip: int, limit: int):
    new_post_Indb = get_posts(skip=skip, limit=limit)
    return new_post_Indb