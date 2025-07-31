import uuid
from datetime import datetime, timezone

from app.db.database import Base
from sqlalchemy import JSON, Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("chat_sessions.id"))
    role = Column(String) # 'user' or 'assistant'
    content = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    routing = Column(JSON, nullable=True)

    # relationship
    session = relationship("ChatSession", backref="messages")