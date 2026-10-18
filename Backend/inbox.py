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
    messages = graph_client.me.messages.get()
    return {"success": True, "messages": messages}

@router.get("/api/view_message/{message_id}")
def view_message(message_id: int):
    message = graph_client.me.messages[message_id].get()
    return {"success": True, "message": message}

@router.post("/api/send_message")
def send_message(message: dict):
    try:
        msg = EmailMessage()
        msg.set_content(message.get("body", ""))
        msg["Subject"] = message.get("subject", "")
        msg["From"] = message.get("from", "")
        msg["To"] = message.get("to", "")

        with smtplib.SMTP("smtp.office365.com", 587) as server:
            server.starttls()
            server.login(os.environ.get("EMAIL_ADDRESS"), os.environ.get("EMAIL_PASSWORD"))
            server.send_message(msg)

        return {"success": True, "message": "Email sent successfully."}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})