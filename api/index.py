from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import logging
from pathlib import Path

# Load environment variables
load_dotenv()

# MongoDB connection
try:
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    mongo_available = True
    print(f"Connected to MongoDB: {db_name}")
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    print("Running in development mode without database")
    mongo_available = False
    client = None
    db = None

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter()

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add routes to the router
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    if mongo_available and db:
        try:
            _ = await db.status_checks.insert_one(status_obj.dict())
        except Exception as e:
            print(f"Database error: {e}")
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if mongo_available and db:
        try:
            status_checks = await db.status_checks.find().to_list(1000)
            return [StatusCheck(**status_check) for status_check in status_checks]
        except Exception as e:
            print(f"Database error: {e}")
            return []
    else:
        return []

# Include the router in the main app (without prefix for Vercel)
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

# Handler for Vercel serverless function
from mangum import Mangum
handler = Mangum(app)