from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.ai.search import semantic_search
from app.schemas import SearchQuery

from app.database import SessionLocal
from app.models import House
from app.schemas import HouseCreate
from app.models import House, User, Favorite
from fastapi import FastAPI, HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.schemas import (
    HouseCreate,
    UserCreate,
    UserLogin
)
@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        return {"message": "Email already exists"}

    new_user = User(
    name=user.name,
    email=user.email,
    password=user.password,
    role="user"
)
    db.add(new_user)
    db.commit()

    return {"message": "User Registered"}

@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    try:
        found_user = db.query(User).filter(
            User.email == user.email,
            User.password == user.password
        ).first()

        if not found_user:
            return {
                "message": "Invalid Email or Password"
            }

        return {
            "message": "Login Successful",
            "user_id": found_user.id,
            "name": found_user.name,
            "role": found_user.role
        }

    finally:
        db.close()


@app.post("/houses")
def add_house(house: HouseCreate):

    db: Session = SessionLocal()

    new_house = House(
    title=house.title,
    location=house.location,
    price=house.price,
    wifi=house.wifi,
    food=house.food,
    ac=house.ac,
    rating=house.rating,
    favorite=house.favorite,
    description=house.description,
    image_url=house.image_url,
    contact=house.contact,
)

    db.add(new_house)
    db.commit()

    return {
        "message": "House Added"
    }


@app.get("/houses")
def get_houses():

    db = SessionLocal()

    try:
        houses = db.query(House).all()
        return houses

    finally:
        db.close()


@app.delete("/houses/{house_id}")
def delete_house(house_id: int):

    db: Session = SessionLocal()

    house = db.query(House).filter(House.id == house_id).first()

    if not house:
        return {"message": "House not found"}

    db.delete(house)
    db.commit()

    return {"message": "House deleted"}

@app.put("/favorite/{house_id}")
def toggle_favorite(house_id: int):

    db = SessionLocal()

    house = db.query(House).filter(
        House.id == house_id
    ).first()

    if not house:
        return {"message": "House not found"}

    house.favorite = not house.favorite

    db.commit()

    return {
        "message": "Favorite updated",
        "favorite": house.favorite
    }

    


@app.post("/search")
def search_houses(search: SearchQuery):

    db = SessionLocal()

    houses = db.query(House).all()

    results = semantic_search(
        search.query,
        houses
    )

    return results

@app.put("/houses/{house_id}")
def update_house(house_id: int, house_data: HouseCreate):

    db = SessionLocal()

    house = db.query(House).filter(House.id == house_id).first()

    if not house:
        return {"message": "House not found"}

    house.image_url = house_data.image_url
    house.title = house_data.title
    house.location = house_data.location
    house.price = house_data.price
    house.wifi = house_data.wifi
    house.food = house_data.food
    house.ac = house_data.ac
    house.rating = house_data.rating
    house.description = house_data.description
    house.favorite = house_data.favorite
    house.contact = house_data.contact

    db.commit()

    return {"message": "House updated"}

@app.post("/favorite/{user_id}/{house_id}")
def add_favorite(user_id: int, house_id: int):

    db = SessionLocal()

    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.house_id == house_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()

        return {
            "message": "Favorite Removed"
        }

    fav = Favorite(
        user_id=user_id,
        house_id=house_id
    )

    db.add(fav)
    db.commit()

    return {
        "message": "Favorite Added"
    }


@app.get("/favorites/{user_id}")
def get_favorites(user_id: int):

    db = SessionLocal()

    try:
        favs = db.query(Favorite).filter(
            Favorite.user_id == user_id
        ).all()

        house_ids = [f.house_id for f in favs]

        houses = db.query(House).filter(
            House.id.in_(house_ids)
        ).all()

        return houses

    finally:
        db.close()

@app.delete("/favorite/{user_id}/{house_id}")
def remove_favorite(user_id: int, house_id: int):

    db = SessionLocal()

    try:
        favorite = db.query(Favorite).filter(
            Favorite.user_id == user_id,
            Favorite.house_id == house_id
        ).first()

        if not favorite:
            return {"message": "Favorite not found"}

        db.delete(favorite)
        db.commit()

        return {"message": "Favorite removed"}

    finally:
        db.close()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()