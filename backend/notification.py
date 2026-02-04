from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.get("/dapr/subscribe")
async def subscribe():
    return [{
        "pubsubname": "kafka-pubsub",
        "topic": "task-events",
        "route": "/ds-sub"  
    }]

@app.post("/ds-sub") 
async def dapr_subscriber(request: Request):
    try:
        event = await request.json()
        
        task_info = event.get("data", "No Task Data")
        
        print("\n" + "🚀" * 20)
        print(f"🔔 NOTIFICATION RECEIVED: {task_info}")
        print("🚀" * 20 + "\n")
        
        return {"status": "success"}
    except Exception as e:
        print(f"Error processing notification: {e}")
        return {"status": "error"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)