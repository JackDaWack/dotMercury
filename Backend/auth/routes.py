
# app/auth/routes.py

import uuid

from fastapi import APIRouter, HTTPException, Request, Response
from fastapi.responses import RedirectResponse

import msal

from config import Settings
from auth import session
from auth.msal_service import (
    create_auth_flow,
    complete_auth_flow,
)

settings = Settings()
router = APIRouter(prefix="/auth", tags=["authentication"])


@router.get("/login")
def login(request: Request):
    # Give this browser a new session identifier.
    old_session_id = request.session.get("session_id")

    if old_session_id:
        session.delete_session(old_session_id)

    session_id = str(uuid.uuid4())
    request.session.clear()
    request.session["session_id"] = session_id

    session.create_session(session_id)

    flow, cache = create_auth_flow()

    if "error" in flow:
        raise HTTPException(
            status_code=500,
            detail="Unable to start Microsoft authentication",
        )

    session.save_flow(session_id, flow)
    session.save_token_cache(session_id, cache.serialize())

    return RedirectResponse(flow["auth_uri"])


@router.get("/callback")
def callback(request: Request):
    session_id = request.session.get("session_id")

    if not session_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication session not found",
        )

    stored_session = session.get_session(session_id)

    if not stored_session or not stored_session["flow"]:
        raise HTTPException(
            status_code=401,
            detail="Authentication flow not found",
        )

    cache = msal.SerializableTokenCache()

    if stored_session["token_cache"]:
        cache.deserialize(stored_session["token_cache"])

    try:
        result = complete_auth_flow(
            stored_session["flow"],
            dict(request.query_params),
            cache,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail="Invalid authentication response or state",
        ) from exc

    if "access_token" not in result:
        # Avoid exposing detailed identity-provider errors to the browser.
        raise HTTPException(
            status_code=401,
            detail="Microsoft authentication failed",
        )

    session.save_token_cache(session_id, cache.serialize())
    session.save_flow(session_id, None)

    return RedirectResponse(settings.frontend_url)


@router.get("/me")
def get_current_user(request: Request):
    session_id = request.session.get("session_id")

    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    stored_session = session.get_session(session_id)

    if not stored_session or not stored_session["token_cache"]:
        raise HTTPException(status_code=401, detail="Not authenticated")

    cache = msal.SerializableTokenCache()
    cache.deserialize(stored_session["token_cache"])

    app = __import__(
        "app.auth.msal_service",
        fromlist=["create_msal_app"],
    ).create_msal_app(cache)

    accounts = app.get_accounts()

    if not accounts:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return {
        "authenticated": True,
        "username": accounts[0].get("username"),
    }


@router.post("/logout", status_code=204)
def logout(request: Request):
    session_id = request.session.get("session_id")

    if session_id:
        session.delete_session(session_id)

    request.session.clear()

    return Response(status_code=204)
