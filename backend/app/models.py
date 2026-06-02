from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()

from sqlalchemy import Column, Integer, String, Boolean, Float, Text

class House(Base):
    __tablename__ = "houses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255))
    location = Column(String(255))
    price = Column(Integer)
    wifi = Column(Boolean)
    food = Column(Boolean)
    ac = Column(Boolean)
    rating = Column(Float)
    description = Column(Text)

    image_url = Column(String(500))
    favorite = Column(Boolean, default=False)
    contact = Column(String(20))

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))
    email = Column(String(100), unique=True)

    password = Column(String(100))
    role = Column(String(20), default="user")

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    house_id = Column(Integer)