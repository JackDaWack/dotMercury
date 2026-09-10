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
    response = JSONResponse(content={"success": True, "message": "Logged out successfully"})
    response.delete_cookie(key="user", path="/")
    return response

@app.get("/api/checking_request_data")
def read_incoming_request(request: Request):
    db.init_db()
    incoming_user = request.cookies.get("user")
    if not incoming_user:
        print("No user cookie found. Redirecting to login page.")
        return {"message": "Welcome! Please log in."}
    print(f"Incoming user logged in: {incoming_user}")
    return {"message": f"Welcome back, {incoming_user}!"}

@app.get("/")
def foo():
    print("Hello from the root endpoint!")


    
