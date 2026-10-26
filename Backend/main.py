from fastapi import FastAPI

from api.mail import router as messages_router
from config import settings

app = FastAPI(title=settings.app_name)

app.include_router(messages_router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}