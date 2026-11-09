from fastapi import FastAPI

from api.mail import router as messages_router
from config import settings
from server.server import Server

app = FastAPI(title=settings.APP_NAME)

app.include_router(messages_router)

@app.get("/")
async def root():
    print("Application has started")
    try:
        Server.start()
        print("Server has started")
    except Exception as e:
        print(f"Failed to start server: {e}")
    return {"message": "Welcome to the FastAPI application!"}

@app.get("/health")
async def health_check():
    try:
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

