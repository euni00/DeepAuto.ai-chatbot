import asyncio
import os
from typing import Optional
from uuid import UUID

from app.db.database import SessionLocal
from app.models import ChatSession, Message
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from openai import OpenAI
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

router = APIRouter(prefix="/chat", tags=["Chat"])

# DeepAuto API settings
DEEPAUTO_API_KEY = os.getenv("DEEPAUTO_API_KEY")
client = OpenAI(
    base_url="https://api.deepauto.ai/openai/v1",
    api_key=DEEPAUTO_API_KEY,
)

# DB session dependency injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        # Response models with camelCase
class ChatSessionResponse(BaseModel):
    id: str = Field(alias="sessionId")
    title: str
    created_at: str = Field(alias="createdAt")
    
    class Config:
        populate_by_name = True

class MessageResponse(BaseModel):
    role: str
    content: str
    created_at: str = Field(alias="createdAt")
    
    class Config:
        populate_by_name = True


@router.get("/sessions", summary="Get all chat sessions", response_model=list[ChatSessionResponse])
def get_chat_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()
    return [
        ChatSessionResponse(
            id=str(session.id),
            title=session.title,
            created_at=session.created_at.isoformat()
        )
        for session in sessions
    ]

@router.get("/sessions/{session_id}/messages", summary="Get messages by session", response_model=list[MessageResponse])
def get_messages(session_id: UUID, db: Session = Depends(get_db)):
    messages = (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.created_at)
        .all()
    )
    return [
        MessageResponse(
            role=message.role,
            content=message.content,
            created_at=message.created_at.isoformat()
        )
        for message in messages
    ]


# send message request schema
class SendMessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = Field(None, alias="sessionId")
    
    class Config:
        populate_by_name = True

@router.post("/send", summary="Send message")
async def send_message(payload: SendMessageRequest, db: Session = Depends(get_db)):
    session_id = payload.session_id
    user_message = payload.message

    # create new session if not exists
    if not session_id:
        new_session = ChatSession()
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        session_id = new_session.id
    else:
        new_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()

    # get previous messages (context)
    previous_messages = (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.created_at)
        .all()
    )
    history = [{"role": msg.role, "content": msg.content} for msg in previous_messages]
    history.append({"role": "user", "content": user_message})

    # save user message
    db.add(Message(session_id=session_id, role="user", content=user_message))
    db.commit()

    # call DeepAuto API
    try: 
        stream = client.chat.completions.create(
            model="openai/gpt-4o-mini-2024-07-18,deepauto/qwq-32b",
            messages=history,
            stream=True,
        )
    except Exception as e: 
        return JSONResponse(
            status_code=500,
            content={
            "code": "AI_RESPONSE_ERROR",
            "message": "An error occurred while generating the AI response."
            }
        );

    async def stream_response():
        loop = asyncio.get_event_loop()
        full_response = ""

        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                full_response += content
                yield f"data: {content}\n\n"
                await asyncio.sleep(0)  # allow context switch

        # save assistant response
        db.add(Message(session_id=session_id, role="assistant", content=full_response))
        db.commit()

    return StreamingResponse(stream_response(), media_type="text/event-stream")