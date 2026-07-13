import sqlite3
from email_validator import validate_email, EmailNotValidError
import bcrypt
from pydantic import BaseModel

class Login_Data(BaseModel):
    username: str
    password: str

class Register_Data(BaseModel):
    username: str
    email: str
    password: str

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