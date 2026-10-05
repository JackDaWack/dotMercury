from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import JSONResponse
import auth
import database as db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth.router)
app.state.oauth = OAuth()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/logout")
def logout():
    response = JSONResponse(content={"success": True})
    response.delete_cookie(key="user_id", path="/")
    response.delete_cookie(key="csrf_token", path="/")
    return response


@app.get("/api/checking_request_data")
def read_incoming_request(request: Request):
    db.init_db()
    incoming_user_id = request.cookies.get("user_id")
    if not incoming_user_id:
        print("No user cookie found. Redirecting to login page.")
        return {"message": "Welcome! Please log in."}

    try:
        incoming_user = db.get_user_by_id(int(incoming_user_id))
    except ValueError:
        incoming_user = None

    if incoming_user is None:
        print("The user session is invalid.")
        return {"message": "Welcome! Please log in."}

    print(f"Incoming user logged in: {incoming_user.username}")
    return {"message": f"Welcome back, {incoming_user.username}!"}


@app.get("/")
def foo():
    print("Hello from the root endpoint!")


    
