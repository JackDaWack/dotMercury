from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])



@app.get("/")
def read_root():
    return {"message": "Hello, World!"}