from app.graph.client import GraphClient
from app.schemas.message import EmailAddress, EmailMessage


async def list_messages(
    graph: GraphClient,
    folder_id: str = "inbox",
    limit: int = 25,
) -> list[EmailMessage]:
    result = await graph.get_messages(
        folder_id=folder_id,
        limit=limit,
    )

    messages = []

    for item in result.get("value", []):
        sender_data = (
            item.get("from", {}).get("emailAddress") or {}
        )

        messages.append(
            EmailMessage(
                id=item["id"],
                subject=item.get("subject"),
                sender=EmailAddress(
                    name=sender_data.get("name"),
                    address=sender_data.get("address"),
                ),
                received_at=item.get("receivedDateTime"),
                is_read=item.get("isRead", False),
                preview=item.get("bodyPreview"),
                has_attachments=item.get("hasAttachments", False),
            )
        )

    return messages