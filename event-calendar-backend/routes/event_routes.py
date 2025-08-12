from fastapi import APIRouter
from databases.event_database import events_collection
from schemas.event_schema import EventCreate,EventUpdate,EventResponse
from typing import List
from bson import ObjectId
from fastapi import HTTPException
from services import event_service as es

router = APIRouter(prefix='/events',tags=["Events"])

# @router.post("/",response_model=EventResponse)
# async def create_event(event: EventCreate):
#     event_data = event.dict()
#     result = await events_collection.insert_one(event_data)
#     await events_collection.update_one({"_id":result.inserted_id},{"$set":{"id":str(result.inserted_id)}})
#     new_event = await events_collection.find_one({"_id":result.inserted_id})
#     print(new_event["_id"])
#     return new_event

# @router.get("/",response_model=List[EventResponse])
# async def get_all_events():
#     events = await events_collection.find().to_list(length=200)
#     return events

# @router.put("/{event_id}",response_model=EventResponse)
# async def update_event(event_id:str, event_data:EventUpdate):
#     existing_event = await events_collection.find_one({"_id":ObjectId(event_id)})
#     if not existing_event:
#         raise HTTPException(status_code=404, detail="Event Not Found")
#     await events_collection.update_one({"_id":ObjectId(event_id)},{"$set": {**event_data.dict(), "id":event_id }})
#     updated_event = await events_collection.find_one({"_id":ObjectId(event_id)})
#     return updated_event

# @router.delete("/{event_id}")
# async def delete_event(event_id: str):
#     existing_event = await events_collection.find_one({"_id":ObjectId(event_id)})
#     if not existing_event:
#         raise HTTPException(status_code=404,detail="Event Not Found")
#     await events_collection.delete_one({"_id":ObjectId(event_id)})
#     return {"message": "Event Deleted Successfully"}

@router.post("/",response_model=EventResponse)
async def create_event(event:EventCreate):
    return await es.create_event_service(event)

@router.get("/",response_model=List[EventResponse])
async def get_all_events():
    return await es.get_all_event_service()

@router.put("/{event_id}",response_model=EventResponse)
async def update_event(event_id:str, event_data:EventUpdate):
    return await es.update_event_service(event_id,event_data)

@router.delete("/{event_id}")
async def delete_event(event_id:str):
    return await es.delete_event_service(event_id)

@router.post("/multiple",response_model=List[EventResponse])
async def create_multiple_events(events: List[EventCreate]):
    return await es.create_multiple_events_service(events)