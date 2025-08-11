from repositories import event_repository as er
from schemas.event_schema import EventCreate,EventUpdate
from fastapi import HTTPException
async def create_event_service(event:EventCreate):
    event_data = event.dict()
    return await er.create_event(event_data)

async def get_all_event_service():
    return await er.get_all_events()

async def update_event_service(event_id:str,event_data:EventUpdate):
    existing_event = er.get_event_by_id(event_id)
    if not existing_event:
        raise HTTPException(status_code=404,detail="Event Not Found")
    return await er.update_event(event_id,event_data.dict())

async def delete_event_service(event_id:str):
    existing_event = er.get_event_by_id(event_id)
    if not existing_event:
        raise HTTPException(status_code=404, detail="Event Not Found")
    await er.delete_event(event_id)
    return {"message":"Event Deleted Successfully"}