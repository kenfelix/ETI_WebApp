from pydantic import BaseSettings
from pymongo import MongoClient


def get_db():
    cluster = settings.db_url
    try:
        client = MongoClient(cluster)
        db = client.test
        print(
            """
            ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️
            --------------------------------------
            Pinged your deployment. 
            You successfully connected to MongoDB!

            -------------------- 🎺️🎺️🎺️🎺️🎺️🎺️
            """
        )
    except Exception as e:
        print(e)
    return db


class Settings(BaseSettings):
    db_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    class Config:
        env_file = ".env"


settings = Settings()
