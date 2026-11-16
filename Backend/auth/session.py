from typing import Any


# Development-only session store.
# Replace with Redis or a database for production.
_sessions: dict[str, dict[str, Any]] = {}


def create_session(session_id: str) -> None:
    _sessions[session_id] = {
        "flow": None,
        "token_cache": None,
    }


def get_session(session_id: str) -> dict[str, Any] | None:
    return _sessions.get(session_id)


def save_flow(session_id: str, flow: dict) -> None:
    _sessions[session_id]["flow"] = flow


def save_token_cache(session_id: str, cache_data: str) -> None:
    _sessions[session_id]["token_cache"] = cache_data


def delete_session(session_id: str) -> None:
    _sessions.pop(session_id, None)
