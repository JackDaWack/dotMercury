from collections.abc import AsyncGenerator

from fastapi import HTTPException

from config import Settings
from graph.client import GraphClient


async def get_graph_client() -> AsyncGenerator[GraphClient, None]:

    if Settings().ENVIRONMENT != "development":
        raise HTTPException(
            status_code=503,
            detail="Development token provider is disabled",
        )

    if not Settings().GRAPH_ACCESS_TOKEN:
        raise HTTPException(
            status_code=503,
            detail="Graph access token is not configured",
        )

    graph = GraphClient(Settings().GRAPH_ACCESS_TOKEN)

    try:
        yield graph
    finally:
        await graph.close()