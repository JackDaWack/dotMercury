from pydantic import BaseModel

class Login_Data(BaseModel):
    email: str
    password: str

class Register_Data(BaseModel):
    username: str
    email: str
    password: str

class User_Deletion_Data(BaseModel):
    email: str
    password: str