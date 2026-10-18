import os
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import smtplib
from email.message import EmailMessage
from msgraph import GraphServiceClient
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential(
    tenant_id=os.environ.get("AZURE_TENANT_ID"),
    client_id=os.environ.get("AZURE_CLIENT_ID"),
    client_secret=os.environ.get("AZURE_CLIENT_SECRET")
)
graph_client = GraphServiceClient(credential=credential)
router = APIRouter()

@router.get("/api/get_messages")
def get_messages():
    # Placeholder for fetching messages from the database
    messages = [
        {"id": 1, "sender": "user1", "subject": "Hello", "body": "How are you?"},
        {"id": 2, "sender": "user2", "subject": "Meeting", "body": "Let's schedule a meeting."}
    ]  
    return {"success": True, "messages": messages}

@router.get("/api/view_message/{message_id}")
def view_message(message_id: int):
    # Placeholder for fetching a specific message from the database
    message = {"id": message_id, "sender": "user1", "subject": "Hello", "body": "How are you?"}
    return {"success": True, "message": message}

@router.post("/api/send_message")
def send_message(message: dict):
    # Placeholder for sending a message via email
    try:
        msg = EmailMessage()
        msg.set_content(message["body"])
        msg["Subject"] = message["subject"]
        msg["From"] = "<EMAIL>"
        msg["To"] = message["recipient"]
        # Placeholder for email sending logic
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}