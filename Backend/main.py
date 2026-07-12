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
            email TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()