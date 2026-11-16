from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.config import settings
from app.api import messages
from app.auth import routes as auth_routes


app = FastAPI(title=settings.app_name)


# Allow the React frontend to communicate with FastAPI.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Signed cookie containing only the session identifier.
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.session_secret,
    session_cookie="email_client_session",
    max_age=60 * 60 * 24 * 7,
    same_site="lax",
    https_only=settings.environment == "production",
)


app.include_router(messages.router)
app.include_router(auth_routes.router)


@app.get("/")
async def root():
    print("Application has started")
    if not Settings().GRAPH_ACCESS_TOKEN:
        try:
            token = server.get_app_access_token()
            print("Access Token retrieved successfully!")
            print("Access Token:", token)
        except Exception as e:
            print(f"Failed to acquire access token: {e}")
    else:
        print("Access Token successfully configured!")
    return {"message": "Welcome to the FastAPI application!"}

@app.get("/health")
async def health_check():
    try:
        print("Health check successful!")
        return {"status": "ok"}
    except Exception as e:
        print(f"Health check failed: {e}")
        return {"status": "error", "message": str(e)}