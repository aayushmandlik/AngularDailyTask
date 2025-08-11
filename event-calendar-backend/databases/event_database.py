from motor.motor_asyncio import AsyncIOMotorClient
from pydantic.v1 import BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str
    DATABASE_NAME: str

    class Config:
        env_file = './.env'

settings = Settings()

connection = AsyncIOMotorClient(settings.MONGO_URL)
db = connection[settings.DATABASE_NAME]

events_collection = db['events']