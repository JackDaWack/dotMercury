# dotMercury
An automated email client for a busy world.

## Microsoft Graph backend

The backend dependencies include the Microsoft Graph SDK and Azure Identity. Before starting the backend with Docker Compose, set the credentials for an Entra ID app registration in the current PowerShell session:

```powershell
$env:AZURE_TENANT_ID = "<tenant-id>"
$env:AZURE_CLIENT_ID = "<client-id>"
$env:AZURE_CLIENT_SECRET = "<client-secret>"
docker compose build backend
docker compose up backend
```

The app registration must have the Microsoft Graph permissions required for the mailbox operations you intend to use, with admin consent granted where required. Keep the client secret out of source control.
