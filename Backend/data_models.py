from pydantic import BaseModel

class Login_Data(BaseModel):
    email: str
    password: str

class Register_Data(BaseModel):
    username: str
    email: str
    password: str

class User_Deletion_Data(BaseModel):
    password: str
    confirmation: str

class Password_Change_Data(BaseModel):
    current_password: str
    new_password: str
    confirm_new_password: str