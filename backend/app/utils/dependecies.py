from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from ..crud.crud import get_user_by_email
from .oauth2 import verify_create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token_data = await verify_create_access_token(
        token=token, credentials_exception=credentials_exception
    )
    user = get_user_by_email(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
