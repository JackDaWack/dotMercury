from fastapi import APIRouter, Depends, HTTPException, Query
import httpx

from graph.client import GraphClient
from graph.dependencies import get_graph_client
from schemas.message import EmailMessage
from services.message_service import list_messages

router = APIRouter(
    prefix="/api/messages",
    tags=["messages"],
)


@router.get("", response_model=list[EmailMessage])
async def get_messages(
    limit: int = Query(default=25, ge=1, le=100),
    graph: GraphClient = Depends(get_graph_client),
):
    try:
        return await list_messages(
            graph=graph,
            folder_id="inbox",
            limit=limit,
        )

    except httpx.HTTPStatusError as exc:
        print("Graph status:", exc.response.status_code)
        print("Graph response:", exc.response.text)
        raise HTTPException(
            status_code=502,
            detail="Microsoft Graph returned an error",
        ) from exc

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to communicate with Microsoft Graph",
        ) from exc