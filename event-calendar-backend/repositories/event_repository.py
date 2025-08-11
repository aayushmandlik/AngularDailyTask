from databases.event_database import events_collection
from bson import ObjectId

async def create_event(event: dict):
    result = await events_collection.insert_one(event)
    await events_collection.update_one({"_id":result.inserted_id},{"$set":{"id":str(result.inserted_id)}})
    return await events_collection.find_one({"_id":result.inserted_id})

async def get_all_events():
    return await events_collection.find().to_list(length=200)

async def update_event(event_id: str, event_data:dict):
    await events_collection.update_one({"_id":ObjectId(event_id)},{"$set": {**event_data, "id":event_id }})
    return await events_collection.find_one({"_id":ObjectId(event_id)})

async def delete_event(event_id: str):
    return await events_collection.delete_one({"_id":ObjectId(event_id)})

async def get_event_by_id(event_id:str):
    return await events_collection.find_one({"_id":ObjectId(event_id)})