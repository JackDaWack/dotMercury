import asyncio
from msgraph import GraphServiceClient
from azure.identity import InteractiveBrowserCredential
import httpx

from app.config import settings


class GraphClient:
    def __init__(self, access_token: str):
        self._client = httpx.AsyncClient(
            base_url=settings.graph_base_url,
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
            timeout=30.0,
        )

    async def get_messages(
        self,
        folder_id: str = "inbox",
        limit: int = 25,
    ) -> dict:
        response = await self._client.get(
            f"/me/mailFolders/{folder_id}/messages",
            params={
                "$top": min(max(limit, 1), 100),
                "$select": (
                    "id,subject,from,receivedDateTime,"
                    "isRead,bodyPreview,hasAttachments"
                ),
                "$orderby": "receivedDateTime desc",
            },
        )
        response.raise_for_status()
        return response.json()

    async def close(self):
        await self._client.aclose()