import sqlite3
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from email_validator import validate_email, EmailNotValidError
import bcrypt
import data_models as dm
import database as db

router = APIRouter()

@router.post("/login")
def login(data: dm.Login_Data):
    user = db.get_user(data.email)
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"]):
        response = JSONResponse(content={"success": True})
        response.set_cookie(key="user", value=user["username"])
        return response
    return {"success": False}

@router.post("/register")
def register(data: dm.Register_Data):
    if db.get_user(data.email):
        return JSONResponse(content={"success": False, "message": "Email already exists"})
    try:
        validate_email(data.email)
    except EmailNotValidError as e:
        return {"success": False, "message": str(e)}
    db.create_user(data.username, data.email, bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()))
    return JSONResponse(content={"success": True, "message": "User registered successfully"})

@router.post("/delete_user")
def delete_user_route(email: str):
    if db.get_user(email):
        db.delete_user(email)
        return JSONResponse(content={"success": True, "message": "User deleted successfully"})
    return JSONResponse(content={"success": False, "message": "User not found"})

@router.post("/update_user")
def update_user_route(email: str, new_username: str = None, new_password: str = None):
    if db.get_user(email):
        if new_username:
            db.update_user(email, new_username=new_username)
        if new_password:
            db.update_user(email, new_password=bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()))
        return JSONResponse(content={"success": True, "message": "User updated successfully"})
    return JSONResponse(content={"success": False, "message": "User not found"})