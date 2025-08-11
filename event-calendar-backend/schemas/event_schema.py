from pydantic import BaseModel,Field
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: str
    date: str
    time: str

class EventUpdate(EventCreate):
    pass

class EventResponse(EventCreate):
    id: str 
    
    

