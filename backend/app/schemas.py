from pydantic import BaseModel

from pydantic import BaseModel

class HouseCreate(BaseModel):
    title: str
    location: str
    price: int
    wifi: bool
    food: bool
    ac: bool
    rating: float
    description: str
    image_url: str
    favorite: bool = False
    contact: str

class UserPreference(BaseModel):
    price: int
    wifi: bool
    food: bool
    ac: bool

class SearchQuery(BaseModel):
    query: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "user"


class UserLogin(BaseModel):
    email: str
    password: str