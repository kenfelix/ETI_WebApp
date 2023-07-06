from pydantic import BaseModel, EmailStr


class User(BaseModel):
    email: EmailStr
    password: str

class Post(BaseModel):
    title: str
    category: str
    content: str
    image: str


# class UserCVRequest:
#     def __init__(
#         self,
#         first_name: str = Form(..., description="User's first name"),
#         last_name: str = Form(..., description="User's last name"),
#         email: EmailStr = Form(..., description="Email"),
#         phone: str = Form(..., description="Phone"),
#         date_of_birth: Optional[str] = Form(description="Date of Birth"),
#         job_title: str = Form(..., description="User's job title"),
#         years_of_experience: Optional[int] = Form(
#             default=None, description="Years of professional experience the user has"
#         ),
#         target_job_Desc: Optional[str] = Form(
#             description="About the job the user is trying to apply to", default=None
#         ),
#         existing_cv: UploadFile = File(),
#     ):
#         self.first_name = first_name
#         self.last_name = last_name
#         self.email = email
#         self.phone = phone
#         self.date_of_birth = date_of_birth
#         self.job_title = job_title
#         self.years_of_experience = years_of_experience
#         self.target_job_Desc = target_job_Desc
#         self.existing_cv = existing_cv
