from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.crud.post import (
    create_post,
    delete_post,
    get_post_by_id,
    get_post_by_slug,
    get_posts,
    update_post,
    create_post_category,
    get_post_categories,
    get_ImageURLs
)

from app.crud.user import upload_image

from app.schemas.request import Post as postRequest, PostCategory
from app.schemas.request import PostUpdate
from app.schemas.response import ImageURL
from app.schemas.response import Post as postResponse, PostCategoryResponse
from app.schemas.response import PyObjectId
from app.schemas.response import User as userResponse
from app.serializers.serializer import serializeDictList
from app.utils.dependecies import get_current_user
from app.utils.enums import Privilege

blog = APIRouter(tags=["Blog"])


@blog.post("/", status_code=status.HTTP_201_CREATED, response_model=postResponse)
async def createPost(
    post: postRequest, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_post_Indb = create_post(post=post)
    return new_post_Indb


@blog.put("/{id}", status_code=status.HTTP_201_CREATED, response_model=postResponse)
async def updatePost(
    post: PostUpdate,
    current_user: Annotated[userResponse, Depends(get_current_user)],
    id: Optional[PyObjectId],
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_post_Indb = update_post(id=id, post=post)
    return new_post_Indb


@blog.post("/image/", status_code=status.HTTP_201_CREATED, response_model=ImageURL)
async def uploadImage(
    current_user: Annotated[userResponse, Depends(get_current_user)],
    image: UploadFile = File(...),
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    imageURL = upload_image(image=image, folderName="post")
    return imageURL


@blog.get("/{slug}", status_code=status.HTTP_200_OK, response_model=postResponse)
async def getPost(slug: str):
    post_Indb = get_post_by_slug(slug=slug)
    return post_Indb


@blog.get("/admin/{id}", status_code=status.HTTP_200_OK, response_model=postResponse)
async def getPostByID(
    id: PyObjectId, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    post_Indb = get_post_by_id(id=id)
    return post_Indb


@blog.get("/", status_code=status.HTTP_200_OK, response_model=List[postResponse])
async def getPosts(skip: Optional[int] = None, limit: Optional[int] = None):
    posts_Indb = get_posts(skip=skip, limit=limit)
    postList = serializeDictList(posts_Indb)
    return postList

@blog.post("/category/", status_code=status.HTTP_201_CREATED, response_model=PostCategoryResponse)
async def createPostCategory(
    postCategory: PostCategory, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_post_Indb = create_post_category(postCategory=postCategory)
    return new_post_Indb


@blog.get("/category/", status_code=status.HTTP_200_OK, response_model=List[PostCategoryResponse])
async def getPostCategories():
    post_categories_Indb = get_post_categories()
    postCategoriesList = serializeDictList(post_categories_Indb)
    return postCategoriesList


@blog.get("/image/", status_code=status.HTTP_200_OK, response_model=List[ImageURL])
async def getImageURLs():
    imageURL_Indb = get_ImageURLs()
    ImageURLList = serializeDictList(imageURL_Indb)
    return ImageURLList


@blog.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletePost(
    id: PyObjectId, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    deleted_post = delete_post(id=id)
    return {}
