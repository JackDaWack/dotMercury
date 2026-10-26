from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EmailAddress(BaseModel):
    name: str | None = None
    address: str | None = None


class EmailMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    subject: str | None = None
    sender: EmailAddress | None = None
    received_at: datetime | None = None
    is_read: bool = False
    preview: str | None = None
    has_attachments: bool = False