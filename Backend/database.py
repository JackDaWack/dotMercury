import os
from typing import Optional
from sqlalchemy import create_engine, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///app.db")
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String(100), unique=True, nullable=True)
    password: Mapped[bytes] = mapped_column(nullable=False)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_user(email: str) -> Optional[User]:
    session = SessionLocal()
    user = session.query(User).filter(User.email == email).first()
    session.close()
    return user


def get_user_by_id(user_id: int) -> Optional[User]:
    session = SessionLocal()
    user = session.query(User).filter(User.id == user_id).first()
    session.close()
    return user


def create_user(username: str, email: Optional[str], password: bytes) -> User:
    session = SessionLocal()
    new_user = User(username=username, email=email, password=password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    session.close()
    return new_user


def delete_user(user_id: int) -> bool:
    session = SessionLocal()
    user = session.query(User).filter(User.id == user_id).first()
    if user:
        session.delete(user)
        session.commit()
        session.close()
        return True
    session.close()
    return False


def update_password(user_id: int, new_password: bytes) -> bool:
    session = SessionLocal()
    try:
        user = session.query(User).filter(User.id == user_id).first()
        if user is None:
            return False
        user.password = new_password
        session.commit()
        return True
    finally:
        session.close()
