### 💬 Project Description

Chatbot using [DeepAuto.ai](http://deepauto.ai/) Scaleserve API

### ⚔️ Frontend & Backend Stack

✅ **Frontend**

Language: Typescript

Library: React

Framework: Next.js

Backend State: Tanstack Query

Component State: Jotai

Style: TailwindCSS, shadcn/ui-based components, react-toastify

package manager: pnpm

✅ **Backend**

Language: Python

Framework: FastAPI

Database: Postgres (Neon DB)

Dependencies: uvicorn, sqlalchemy, psycopg2-binary, python-dotenv, openai, alembic

✅ **Working Tools:** Cursor IDE, ChatGPT, Claude

### 🐳 Run with Docker Compose

```bash
docker compose up --build
```

### 🖥️ Local Development URLs

| Service      | URL                                             | Description           |
| ------------ | ----------------------------------------------- | --------------------- |
| Frontend     | [http://localhost:3000](http://localhost:3000/) | Next.js App           |
| Backend      | [http://localhost:8000](http://localhost:8000/) | FastAPI Server        |
| Swagger Docs | http://localhost:8000/docs                      | FastAPI Auto API Docs |

### ⭐ Architecture Overview

                       +-----------------+
                       |     Client      |
                       | (Next.js App)   |
                       +--------+--------+
                                |
                                | HTTP (REST API)
                                v
                  +-------------+--------------+
                  |      Backend API Server    |
                  |        (FastAPI)           |
                  +-------------+--------------+
                                |
                                | SQL over SSL
                                v
                +------------------------------+
                |        PostgreSQL (NeonDB)   |
                +------------------------------+

- **Frontend (Next.js)**: Sends user messages, displays assistant responses in real time, and visualizes routing data (selected model & scores).
- **Backend (FastAPI)**:
  - Stores chat sessions and messages in DB
  - Communicates with DeepAuto.ai’s API using stream=True
  - Streams partial responses back to frontend
- **Database**: Stores all conversations for retrieval and context preservation.

## FRONTEND

### **📁 Project Structure**

```
/src
├── API
│   ├── common                // Common utilities for API calls
│   │   ├── API.ts            // Axios instance for API requests
│   │   ├── endpoints.ts      // Centralized API endpoint definitions
│   │   └── queryKeys.ts      // React Query keys for caching
│   └── queries               // React Query hooks
├── app
│   ├── chat
│   │   ├── view              // Chat session view components
│   │   │   ├── ChatView      // Displays messages for a chat session
│   │   │   └── InitChatView  // Initial chat view for new sessions
│   ├── ChatContainer         // Wrapper container for chat UI
│   ├── global.css            // Global styles
│   ├── layout.tsx            // Root layout component
│   ├── page.tsx              // Root page component
│   └── index.ts              // Project entry point
├── common
│   ├── Layout                // Common layout components
│   ├── store                 // Jotai/Redux or global state stores
│   └── type                  // TypeScript type definitions
├── components
│   ├── ui                    // shadcn/ui-based components
│   ├── RoutingInfo.tsx       // Component for displaying routing info
│   └── SendButton.ts         // Reusable send button component
├── constants                 // Shared constant values
│   └── toastMessages.ts      // Toast notification messages
└── features                  // Feature-based business logic
```

### **📌** Features

- ✅ Retrieve chat session list
- ✅ View chat messages by session
- ✅ Start a new session by clicking “New Chat”
- ✅ Continue conversations in existing sessions
- ✅ Click “Show Routing Info” to view the selected model and candidate model grades

### ⚒️ How to Run (Command)

```bash
cd nextjs
pnpm install
pnpm run dev
```

## BACKEND

### **📁 Project Structure**

```bash
server/
├── app/
│   ├── api/
│   │   └── chat.py          # Main API endpoints
│   ├── db/
│   │   └── database.py      # DB session / engine
│   ├── models/
│   │   ├── __init__.py
│   │   ├── chat_session.py  # Chat session table model
│   │   └── message.py       # Chat message table model
├── main.py                  # FastAPI app entry
├── .env                     # API key & DB URL
└── requirements.txt         # Python dependency list
```

### 📦 Backend Dependencies

This project uses the following Python packages in the FastAPI backend:

- `uvicorn==0.35.0` – ASGI server to run FastAPI.
- `SQLAlchemy==2.0.41` – ORM used for PostgreSQL database interaction.
- `psycopg2-binary==2.9.10` – PostgreSQL driver.
- `python-dotenv==1.1.1` – Loads environment variables from `.env` files.
- `openai==1.57.0` – Accesses the OpenAI API.
- `alembic==1.16.4` – Database migration tool used to manage SQLAlchemy schema changes.

> 📁 These packages are listed in server/requirements.txt.

## **📌** Features

- ✅ Streamed chatbot responses via DeepAuto.ai
- ✅ Chat session context preserved per session
- ✅ Assistant message routing metadata (model info) displayed

### 📄 API List

- /chat/send : Sends a chat message to the DeepAuto API and receives a streaming response.
- /chat/sessions: Retrieves a list of all chat sessions.
- /chat/sessions/{id}/messages: Fetches all messages within a specific chat session.

## **🗃️ Database Schema**

### **🧾 chat_sessions**

Stores chat session information.
| **Column** | **Type** | **Description** |
| --- | --- | --- |
| id | UUID | Primary Key |
| title | String | Default: “New Chat” |
| created_at | DateTime | 생성 시각 (UTC) |

### **💬 messages**

Saves messages exchanged within each session.

| **Column** | **Type** | **Description**                |
| ---------- | -------- | ------------------------------ |
| id         | UUID     | Primary Key                    |
| session_id | UUID     | Foreign Key → chat_sessions.id |
| role       | String   | user or assistant              |
| content    | String   | assistant message              |
| created_at | DateTime | message created time           |
| routing    | JSONB    | routing data                   |

### 🧩 Data Migration

```bash
# Create a new migration
alembic revision --autogenerate -m "add routing"

# Apply the migration to the database
alembic upgrade head
```

### ⚒️ How to Run the Server (Command)

```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
