from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
import imaplib
import auth
import database as db

app = FastAPI()
app.include_router(auth.router)
app.state.oauth = OAuth()
mail = imaplib.IMAP4_SSL('imap.gmail.com')

@app.get("/dotMercury_Login")
def dotMercury_Login():
    pass

@app.get("/dotMercury_Register")
def dotMercury_Register():
    pass

@app.get("/dotMercury_Logout")
def dotMercury_Logout():
    pass

@app.get("/api/hello_world")
def hello_world():
    return {"message": "Hello, World!"}

#@app.get("/")
def read_incoming_user(request: Request):
    db.init_db()
    incoming_user = request.cookies.get("user")
    if not incoming_user:
        print("No user cookie found. Redirecting to login page.")
        return {"message": "Welcome! Please log in."}
    print(f"Incoming user logged in: {incoming_user}")
    return {"message": f"Welcome back, {incoming_user}!"}
    
