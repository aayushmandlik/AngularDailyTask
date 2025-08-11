from fastapi import FastAPI,APIRouter
from routes.event_routes import router as event_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4500"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)


app.include_router(event_router)