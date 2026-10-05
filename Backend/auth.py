import secrets
from fastapi import APIRouter, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from email_validator import validate_email, EmailNotValidError
import bcrypt
import data_models as dm
import database as db

router = APIRouter()
CSRF_CONFIRMATION = "DELETE ACCOUNT"


def get_authenticated_user(request: Request) -> db.User:
    user_id = request.cookies.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")

    try:
        user = db.get_user_by_id(int(user_id))
    except ValueError:
        raise HTTPException(status_code=401, detail="Authentication required")

    if user is None:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user


def require_csrf(request: Request, token: str = Header(None)):
    csrf_token = request.cookies.get("csrf_token")
    if not csrf_token or not token or not secrets.compare_digest(csrf_token, token):
        raise HTTPException(status_code=403, detail="Invalid CSRF token")


@router.get("/api/csrf")
def get_csrf_token():
    token = secrets.token_urlsafe(32)
    response = JSONResponse(content={"success": True, "token": token})
    response.set_cookie(
        key="csrf_token",
        value=token,
        path="/",
        samesite="strict",
        httponly=False,
        max_age=3600,
    )
    return response


@router.post("/api/login")
def login(data: dm.Login_Data):
    try:
        user = db.get_user(data.email)
        if user and bcrypt.checkpw(data.password.encode('utf-8'), user.password):
            response = JSONResponse(content={"success": True})
            response.set_cookie(
                key="user_id",
                value=str(user.id),
                path="/",
                samesite="strict",
                httponly=True,
                max_age=60 * 60 * 24,
            )
            return response
        return {"success": False, "message": "Invalid email or password"}
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.post("/api/register")
def register(data: dm.Register_Data):
    if db.get_user(data.email):
        return JSONResponse(content={"success": False, "message": "Email already exists"})
    try:
        validate_email(data.email)
    except EmailNotValidError as e:
        return {"success": False, "message": str(e)}
    db.create_user(data.username, data.email, bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()))
    return JSONResponse(content={"success": True, "message": "User registered successfully"})


@router.delete("/api/delete_user")
def delete_user_route(
    request: Request,
    data: dm.User_Deletion_Data,
    x_csrf_token: str = Header(None),
):
    require_csrf(request, x_csrf_token)
    user = get_authenticated_user(request)

    if data.confirmation != CSRF_CONFIRMATION:
        raise HTTPException(status_code=400, detail="Invalid confirmation phrase")

    if not bcrypt.checkpw(data.password.encode("utf-8"), user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    if not db.delete_user(user.id):
        raise HTTPException(status_code=404, detail="Account not found")

    response = JSONResponse(content={"success": True, "message": "Account deleted successfully"})
    response.delete_cookie(key="user_id", path="/")
    response.delete_cookie(key="csrf_token", path="/")
    return response


@router.post("/api/update_user")
def update_user_route(email: str, new_username: str = None, new_password: str = None):
    if db.get_user(email):
        if new_username:
            db.update_user(email, new_username=new_username)
        if new_password:
            db.update_user(email, new_password=bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()))
        return JSONResponse(content={"success": True, "message": "User updated successfully"})
    return JSONResponse(content={"success": False, "message": "User not found"})