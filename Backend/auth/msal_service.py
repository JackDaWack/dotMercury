import msal

from config import Settings


settings = Settings()

SCOPES = [
    "User.Read",
    "Mail.Read",
]


AUTHORITY = (
    f"https://login.microsoftonline.com/"
    f"{settings.GRAPH_TENANT_ID}"
)


def create_msal_app(cache=None):
    return msal.ConfidentialClientApplication(
        client_id=settings.GRAPH_CLIENT_ID,
        authority=AUTHORITY,
        client_credential=settings.GRAPH_CLIENT_SECRET,
        token_cache=cache,
    )


def create_auth_flow():
    cache = msal.SerializableTokenCache()
    app = create_msal_app(cache)

    flow = app.initiate_auth_code_flow(
        scopes=SCOPES,
        redirect_uri=settings.microsoft_redirect_uri,
    )

    return flow, cache


def complete_auth_flow(flow, auth_response, cache):
    app = create_msal_app(cache)

    return app.acquire_token_by_auth_code_flow(
        flow,
        auth_response,
    )
