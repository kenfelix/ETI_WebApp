from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.crud.crud import create_user, get_user_by_email
from app.models.users import Token
from app.schemas.request import User as userRequest
from app.schemas.response import User as userResponse
from app.utils.oauth2 import create_access_token
from app.utils.utils import verify
from app.utils.enums import Privilege

auth = APIRouter(tags=["Authentication"])


@auth.post("/login", response_model=Token)
def login(
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    userIndb = get_user_by_email(email=user_credentials.username)
    user: userResponse = userResponse(**userIndb)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(data={"email": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@auth.post("/admin", response_model=Token)
def adminLogin(
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    userIndb = get_user_by_email(email=user_credentials.username)
    user: userResponse = userResponse(**userIndb)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    if user.privilege < Privilege.STAFF.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!")
    access_token = create_access_token(data={"email": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@auth.post("/", status_code=status.HTTP_201_CREATED, response_model=userResponse)
async def createUser(user: userRequest):
    userIndb = get_user_by_email(email=user.email)
    if userIndb:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Email already registered"
        )
    new_user_Indb = create_user(user=user)
    return new_user_Indb


# def serializeDict(document) -> dict:
#     return {
#         **{i: str(document[i]) for i in document if i == "_id"},
#         **{i: document[i] for i in document if i != "_id"},
#     }
