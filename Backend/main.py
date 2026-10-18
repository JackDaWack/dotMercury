from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}