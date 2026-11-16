import msal

from fastapi import Depends, HTTPException, Request

from auth.session import get_session, save_token_cache
from auth.msal_service import create_msal_app, SCOPES


def get_current_access_token(request: Request) -> str:
    session_id = request.session.get("session_id")

    if not session_id:
        raise HTTPException(
            status_code=401,
            detail="Please sign in",
        )

    stored_session = get_session(session_id)

    if not stored_session or not stored_session["token_cache"]:
        raise HTTPException(
            status_code=401,
            detail="Please sign in",
        )

    cache = msal.SerializableTokenCache()
    cache.deserialize(stored_session["token_cache"])

    app = create_msal_app(cache)

    accounts = app.get_accounts()

    if not accounts:
        raise HTTPException(
            status_code=401,
            detail="No authenticated account found",
        )

    result = app.acquire_token_silent(
        scopes=SCOPES,
        account=accounts[0],
    )

    if not result or "access_token" not in result:
        raise HTTPException(
            status_code=401,
            detail="Your session has expired. Please sign in again.",
        )

    save_token_cache(session_id, cache.serialize())

    return result["access_token"]
