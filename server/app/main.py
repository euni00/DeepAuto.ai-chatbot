from app.api import chat
from app.db.database import engine
from app.models import Base, ChatSession, Message
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app with metadata
app = FastAPI(
    title="DeepAuto Chatbot API",
    description="DeepAuto.ai 기반 스트리밍 챗봇 기능을 제공하는 API입니다.",
    version="1.0.0",
    contact={
        "name": "YEEUN LEE",
        "url": "https://github.com/euni00/DeepAuto.ai-chatbot.git",
        "email": "amy000809@gmail.com",
    },
)

# create DB tables
Base.metadata.create_all(bind=engine)

# router
app.include_router(chat.router)

## CORS configuration: allow requests from the frontend at localhost:3000
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)