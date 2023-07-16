from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.crud.crud import (
    create_user,
    delete_user,
    get_user_by_email,
    get_users,
    update_user_password,
)
from app.models.users import Token
from app.schemas.request import User as userRequest
from app.schemas.response import PyObjectId
from app.schemas.response import User as userResponse
from app.serializers.serializer import serializeDictList
from app.utils.dependecies import get_current_user
from app.utils.enums import Privilege
from app.utils.oauth2 import create_access_token
from app.utils.utils import verify

auth = APIRouter(tags=["Authentication"])


@auth.post("/login", response_model=Token)
def login(
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    userIndb = get_user_by_email(email=user_credentials.username)

    if not userIndb:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )

    user: userResponse = userResponse(**userIndb)
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

    if not userIndb:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )

    user: userResponse = userResponse(**userIndb)
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    if user.privilege < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    access_token = create_access_token(data={"email": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@auth.post("/validate", status_code=status.HTTP_200_OK, response_model=userResponse)
async def validate(
    jwt: Token,
):
    user = await get_current_user(token=jwt.access_token)
    return user


@auth.post("/", status_code=status.HTTP_201_CREATED, response_model=userResponse)
async def createUser(
    user: userRequest, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    userIndb = get_user_by_email(email=user.email)
    if userIndb:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Email already registered"
        )
    new_user_Indb = create_user(user=user)
    return new_user_Indb


@auth.get("/admin", response_model=List[userResponse])
def getUsers(current_user: Annotated[userResponse, Depends(get_current_user)]):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    users_Indb = get_users()
    userList = serializeDictList(users_Indb)
    return userList


@auth.put("/admin", status_code=status.HTTP_201_CREATED, response_model=userResponse)
def updateUser(
    id: PyObjectId,
    password: str,
    current_user: Annotated[userResponse, Depends(get_current_user)],
):
    current_user = userResponse(**current_user)
    if not current_user.confirmed:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.privilege < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )

    if current_user.privilege == Privilege.STAFF.value and current_user.id == id:
        user = update_user_password(id=id, password=password)
    elif current_user.privilege == Privilege.ADMIN.value:
        user = update_user_password(id=id, password=password)
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    return user


@auth.delete("/admin", status_code=status.HTTP_204_NO_CONTENT)
def deleteUser(
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
    deleted_user = delete_user(id=id)
    return {}
