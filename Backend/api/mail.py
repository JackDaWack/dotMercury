from fastapi import APIRouter, HTTPException, Query

from app.schemas.message import EmailMessage

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.get("", response_model=list[EmailMessage])
async def get_messages(
    limit: int = Query(default=25, ge=1, le=100),
):
    # Authentication and Graph dependency injection
    # will be connected in a later phase.
    raise HTTPException(
        status_code=501,
        detail="Graph integration is not connected yet",
    )