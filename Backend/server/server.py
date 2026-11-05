import msal

# Your Entra ID registration details
TENANT_ID = "your-tenant-id"
CLIENT_ID = "your-client-id"
CLIENT_SECRET = "your-client-secret"

# The authority URL for your tenant
AUTHORITY = f"https://microsoftonline.com{TENANT_ID}"

# For App-Only flow, the scope must be the default Graph endpoint
SCOPES = ["https://microsoft.com"]

def get_app_access_token():
    # Initialize the Confidential Client Application
    app = msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=AUTHORITY,
        client_credential=CLIENT_SECRET
    )
    
    # Look for a cached token first; if none exists, acquire a new one
    result = app.acquire_token_silent(SCOPES, account=None)
    
    if not result:
        print("No suitable token in cache. Fetching a new one...")
        result = app.acquire_token_for_client(scopes=SCOPES)
        
    if "access_token" in result:
        return result["access_token"]
    else:
        raise Exception(f"Could not acquire token: {result.get('error_description')}")

# Usage
token = get_app_access_token()
print("Access Token:", token)
