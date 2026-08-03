from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
import imaplib
import sqlite3

app = FastAPI()
app.state.oauth = OAuth()
mail = imaplib.IMAP4_SSL('imap.gmail.com')

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password BYTES NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.get("/dotMercury_Login")
def dotMercury_Login():
    pass

@app.get("/dotMercury_Register")
def dotMercury_Register():
    pass

@app.get("/dotMercury_Logout")
def dotMercury_Logout():
    pass

@app.get("/")
def read_incoming_user(request: Request):
    init_db()
    incoming_user = request.cookies.get("user")
    if not incoming_user:
        print("No user cookie found. Redirecting to login page.")
        return {"message": "Welcome! Please log in."}
    print(f"Incoming user logged in: {incoming_user}")
    return {"message": f"Welcome back, {incoming_user}!"}
    
