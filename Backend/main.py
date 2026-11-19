from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware


from config import Settings
import api.mail as mail
import auth.routes as auth_routes
from server import server


app = FastAPI()


# Allow the React frontend to communicate with FastAPI.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Settings().frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Signed cookie containing only the session identifier.
app.add_middleware(
    SessionMiddleware,
    secret_key=Settings().session_secret,
    session_cookie="email_client_session",
    max_age=60 * 60 * 24 * 7,
    same_site="lax",
    https_only=Settings().environment == "production",
)


app.include_router(mail.router)
app.include_router(auth_routes.router)


@app.get("/")
async def root():
    print("Application has started")
    if not Settings().graph_access_token:
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