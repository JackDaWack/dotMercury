from collections.abc import AsyncGenerator

from fastapi import HTTPException

from config import Settings
from graph.client import GraphClient


async def get_graph_client() -> AsyncGenerator[GraphClient, None]:

    if Settings().environment != "development":
        raise HTTPException(
            status_code=503,
            detail="Development token provider is disabled",
        )

    if not Settings().graph_access_token:
        raise HTTPException(
            status_code=503,
            detail="Graph access token is not configured",
        )

    graph = GraphClient(Settings().graph_access_token)

    try:
        yield graph
    finally:
        await graph.close()