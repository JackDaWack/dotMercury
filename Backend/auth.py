import sqlite3
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from email_validator import validate_email, EmailNotValidError
import bcrypt
import data_models as dm

router = APIRouter()

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

def get_user(username: str):
    db = sqlite3.connect("users.db").cursor()
    db.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = db.fetchone()
    db.connection.close()
    if user:
        return {"id": user[0], "username": user[1], "email": user[2], "password": user[3]}
    return None

def create_user(username: str, email: str, password: str):
    db = sqlite3.connect("users.db").cursor()
    db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, password))
    db.connection.commit()
    db.connection.close()

def delete_user(username: str):
    db = sqlite3.connect("users.db").cursor()
    db.execute("DELETE FROM users WHERE username = ?", (username,))
    db.connection.commit()
    db.connection.close()

@router.post("/login")
def login(data: dm.Login_Data):
    user = get_user(data.username)
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"]):
        response = JSONResponse(content={"success": True})
        response.set_cookie(key="user", value=data.username)
        return response
    return {"success": False}

@router.post("/register")
def register(data: dm.Register_Data):
    if get_user(data.username):
        return JSONResponse(content={"success": False, "message": "Username already exists"})
    if get_user(data.email):
        return JSONResponse(content={"success": False, "message": "Email already exists"})
    try:
        validate_email(data.email)
    except EmailNotValidError as e:
        return {"success": False, "message": str(e)}
    create_user(data.username, data.email, bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()))
    return JSONResponse(content={"success": True, "message": "User registered successfully"})

@router.post("/delete_user")
def delete_user_route(username: str):
    if get_user(username):
        delete_user(username)
        return JSONResponse(content={"success": True, "message": "User deleted successfully"})
    return JSONResponse(content={"success": False, "message": "User not found"})