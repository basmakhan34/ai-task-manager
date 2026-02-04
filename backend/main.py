from fastapi import FastAPI, HTTPException
import asyncio
import json
import urllib.request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import engine, init_db
from models import Task
from ai_agent import ask_ai
from contextlib import asynccontextmanager

# 1. Database initialize karne ke liye lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db() 
    yield

app = FastAPI(lifespan=lifespan)

# 2. CORS Middleware (Frontend connectivity ke liye)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Isay temporary "*" kar dein taake testing ho sake
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/todos")
async def get_todos():
    with Session(engine) as session:
        return session.exec(select(Task)).all()

@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, request: dict):
    with Session(engine) as session:
        todo = session.get(Task, todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Not found")
        
        todo.completed = request.get("completed", todo.completed)
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    with Session(engine) as session:
        todo = session.get(Task, todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Not found")
        session.delete(todo)
        session.commit()
        return {"message": "Deleted"}

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    try:
        # AI Agent se response lena (Validation ke saath)
        user_message = request.get("message", "")
        if not user_message:
            return {"response": "I didn't hear anything. What's on your mind?", "task_created": False}

        response_text, task_created = ask_ai(user_message)
        
        # Phase 5: Event-Driven Logic (Dapr Publish)
        if task_created:
            try:
                # Sirf zaroori data bhejein
                payload = {
                    "data": f"Task Created: {task_created.task}"
                }

                def _publish(p):
                    # FIX: Network mode 'service:backend' ki wajah se yahan localhost aayega
                    DAPR_PUBLISH_URL = "http://localhost:3500/v1.0/publish/kafka-pubsub/task-events"
                    data = json.dumps(p).encode("utf-8")
                    req = urllib.request.Request(
                        DAPR_PUBLISH_URL, 
                        data=data, 
                        headers={"Content-Type": "application/json"}
                    )
                    try:
                        urllib.request.urlopen(req, timeout=2)
                        print("✅ Message published to Kafka via Dapr")
                    except Exception as e:
                        print(f"⚠️ Dapr Publish Failed (Silent): {e}")

                
                asyncio.create_task(asyncio.to_thread(_publish, payload))
            except Exception as e:
                print(f"Payload Formatting Error: {e}")

        return {"response": response_text, "task_created": bool(task_created)}

    except Exception as e:
        print(f"❌ Chat Critical Error: {e}")
        # Custom message taake UI crash na ho
        return {"response": "Sorry, I'm having trouble connecting right now. Let's try again.", "task_created": False}