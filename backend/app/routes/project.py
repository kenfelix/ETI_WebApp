from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.crud.project import (
    create_project,
    delete_project,
    get_project_by_id,
    get_project_by_slug,
    get_projects,
    update_project,
    create_project_category,
    get_project_categories,
    get_ImageURLs
)

from app.crud.user import upload_image
from app.schemas.request import Project as projectRequest, ProjectCategory
from app.schemas.request import ProjectUpdate
from app.schemas.response import ImageURL
from app.schemas.response import Project as projectResponse, ProjectCategoryResponse
from app.schemas.response import PyObjectId
from app.schemas.response import User as userResponse
from app.serializers.serializer import serializeDictList
from app.utils.dependecies import get_current_user
from app.utils.enums import Privilege

project = APIRouter(tags=["Project"])


@project.post("/", status_code=status.HTTP_201_CREATED, response_model=projectResponse)
async def createProject(
    project: projectRequest, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_project_Indb = create_project(project=project)
    return new_project_Indb


@project.put("/{id}", status_code=status.HTTP_201_CREATED, response_model=projectResponse)
async def updateProject(
    project: ProjectUpdate,
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
    new_project_Indb = update_project(id=id, project=project)
    return new_project_Indb


@project.post("/image/", status_code=status.HTTP_201_CREATED, response_model=ImageURL)
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
    imageURL = upload_image(image=image, folderName="project")
    return imageURL


@project.get("/{slug}", status_code=status.HTTP_200_OK, response_model=projectResponse)
async def getProject(slug: str):
    project_Indb = get_project_by_slug(slug=slug)
    return project_Indb


@project.get("/admin/{id}", status_code=status.HTTP_200_OK, response_model=projectResponse)
async def getProjectByID(
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
    project_Indb = get_project_by_id(id=id)
    return project_Indb


@project.get("/", status_code=status.HTTP_200_OK, response_model=List[projectResponse])
async def getProjects(skip: Optional[int] = None, limit: Optional[int] = None):
    projects_Indb = get_projects(skip=skip, limit=limit)
    projectList = serializeDictList(projects_Indb)
    return projectList

@project.post("/category/", status_code=status.HTTP_201_CREATED, response_model=ProjectCategoryResponse)
async def createProjectCategory(
    projectCategory: ProjectCategory, current_user: Annotated[userResponse, Depends(get_current_user)]
):
    if not current_user.get("confirmed"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unverified Email Address."
        )
    if current_user.get("privilege") < Privilege.STAFF.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied!"
        )
    new_project_Indb = create_project_category(projectCategory=projectCategory)
    return new_project_Indb


@project.get("/category/", status_code=status.HTTP_200_OK, response_model=List[ProjectCategoryResponse])
async def getProjectCategories():
    project_categories_Indb = get_project_categories()
    projectCategoriesList = serializeDictList(project_categories_Indb)
    return projectCategoriesList


@project.get("/image/", status_code=status.HTTP_200_OK, response_model=List[ImageURL])
async def getImageURLs():
    imageURL_Indb = get_ImageURLs()
    ImageURLList = serializeDictList(imageURL_Indb)
    return ImageURLList


@project.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteProject(
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
    deleted_project = delete_project(id=id)
    return {}
