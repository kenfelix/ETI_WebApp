from typing import Annotated, Dict, List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.crud.dynamic import (
    create_page_content,
    get_page_content_by_page,
    update_page_content,
    upload_photo_book,
    get_ImageURLs,
    delete_image,
    create_donation,
    get_donations
)

from app.schemas.response import ImageURL, DonationResponse
from app.schemas.response import User as userResponse
from app.serializers.serializer import serializeDict, serializeDictList
from app.utils.dependecies import get_current_user
from app.utils.enums import Privilege
from app.schemas.request import DonationRequest


dynamic = APIRouter(tags=["Dynamic Content"])


@dynamic.post("/", status_code=status.HTTP_201_CREATED)
async def createPageContent(
    pageContent: Dict, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_project_Indb = create_page_content(pageContent=pageContent)
    return serializeDict(new_project_Indb)


@dynamic.put("/{page}", status_code=status.HTTP_201_CREATED)
async def updatePageContent(
    pageContent: Dict,
    current_user: Annotated[userResponse, Depends(get_current_user)],
    page: str,
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_project_Indb = update_page_content(page=page, pageContent=pageContent)
    return serializeDict(new_project_Indb)


@dynamic.post("/image/", status_code=status.HTTP_201_CREATED, response_model=ImageURL)
async def uploadPhotoBook(
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
    imageURL = upload_photo_book(image=image, folderName="photoBook")
    return imageURL


@dynamic.get("/{page}", status_code=status.HTTP_200_OK)
async def getPageContent(page: str):
    pageContent_Indb = get_page_content_by_page(page=page)
    return serializeDict(pageContent_Indb)


@dynamic.get("/image/", status_code=status.HTTP_200_OK, response_model=List[ImageURL])
async def getImageURLs():
    imageURL_Indb = get_ImageURLs()
    ImageURLList = serializeDictList(imageURL_Indb)
    return ImageURLList

@dynamic.delete("/{imageUrl}", status_code=status.HTTP_204_NO_CONTENT)
async def deletePhoto(
    imageURL: str, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    deleted_image = delete_image(imageURL=imageURL)
    return {}


@dynamic.post("/donation/", status_code=status.HTTP_201_CREATED, response_model=DonationResponse)
async def createDonation(
    donation: DonationRequest
):
    new_donation_Indb = create_donation(donation=donation)
    return new_donation_Indb


@dynamic.get("/donation/", status_code=status.HTTP_200_OK, response_model=List[DonationResponse])
async def getDonations():
    donations_Indb = get_donations()
    return serializeDictList(donations_Indb)