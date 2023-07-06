import uvicorn
from fastapi import FastAPI

from app.routes import user, dynamic

app = FastAPI()


app.include_router(user.auth, prefix="/user")
app.include_router(dynamic.blog, prefix="/blog")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
