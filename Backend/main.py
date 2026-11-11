from fastapi import FastAPI

from api.mail import router as messages_router
from config import Settings
import server.server as server

app = FastAPI(title=Settings().APP_NAME)

app.include_router(messages_router)

@app.get("/")
async def root():
    print("Application has started")
    if not Settings().GRAPH_ACCESS_TOKEN:
        try:
            token = server.get_app_access_token()
            print("Access Token retrieved successfully!")
            print("Access Token:", token)
        except Exception as e:
            print(f"Failed to acquire access token: {e}")
    else:
        print("Access Token successfully configured!")
    return {"message": "Welcome to the FastAPI application!"}

@app.get("/health")
async def health_check():
    try:
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

