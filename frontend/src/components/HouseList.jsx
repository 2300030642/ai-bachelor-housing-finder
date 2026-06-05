import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";


function HouseList() {
  const user = JSON.parse(
  localStorage.getItem("user") || "null"
);
const isAdmin = user?.role === "admin";
if (!user) {
  return (
    <div className="container mt-5">
      <h3>Please Login</h3>
    </div>
  );
}

  const [houses, setHouses] = useState([]);
const [editingId, setEditingId] = useState(null);
  // House Form
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [wifi, setWifi] = useState(false);
  const [food, setFood] = useState(false);
  const [ac, setAc] = useState(false);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [contact, setContact] = useState("");

  const [filterLocation, setFilterLocation] = useState("");
const [filterPrice, setFilterPrice] = useState("");
const [filterWifi, setFilterWifi] = useState(false);


const [filterFood, setFilterFood] = useState(false);
const [filterAc, setFilterAc] = useState(false);
const [sortBy, setSortBy] = useState("");
const [favorites, setFavorites] = useState([]);



const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/favorites/${user.user_id}`)

    console.log("Favorites:", response.data);

    setFavorites(response.data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {

  const loadUser = () => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  };

  loadUser();

  window.addEventListener(
    "storage",
    loadUser
  );

  return () =>
    window.removeEventListener(
      "storage",
      loadUser
    );

}, []);

const isFavorite = (houseId) => {
  return favorites.some(
    (fav) => fav.id === houseId
  );
};

const removeFavorite = async (houseId) => {
  try {
    await axios.delete(
      `${API_URL}/favorite/${user.user_id}/${houseId}`
    );

    await fetchFavorites();
    fetchHouses();

  } catch (error) {
    console.log(error);
  }
};


const filteredHouses = houses
  .filter((house) => {
    const locationMatch =
      filterLocation === "" ||
      (house.location &&
        house.location
          .toLowerCase()
          .includes(filterLocation.toLowerCase()));

    const priceMatch =
      filterPrice === "" ||
      house.price <= Number(filterPrice);

    const wifiMatch =
      !filterWifi || house.wifi;

    const foodMatch =
      !filterFood || house.food;

    const acMatch =
      !filterAc || house.ac;
      const favoriteMatch =
  !showFavorites || isFavorite(house.id);

    return (
  locationMatch &&
  priceMatch &&
  wifiMatch &&
  foodMatch &&
  acMatch &&
  favoriteMatch
);
  })
  .sort((a, b) => {
    if (sortBy === "priceLow")
      return a.price - b.price;

    if (sortBy === "priceHigh")
      return b.price - a.price;

    if (sortBy === "rating")
      return (b.rating || 0) - (a.rating || 0);

    return 0;
  });





  return (
    <div className="container mt-4">
      <div className="text-center mb-5 hero-section">
  <h5 className="text-secondary">
    Welcome, {user.name}
  </h5>

  <h1>
    🏠 AI Bachelor Housing Finder
  </h1>

  <p className="text-muted">
    Find the best PGs and hostels near you
  </p>
</div>

      {isAdmin && (
  <>
  <div className="card p-4 mb-4">
  <h2 className="mb-4">🏠 Add New House</h2>
      </div>

      <input
  type="text"
  className="form-control mb-3"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

<input
  type="number"
  className="form-control mb-3"
  placeholder="Price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<input
  type="number"
  className="form-control mb-3"
  placeholder="Rating"
  value={rating}
  onChange={(e) => setRating(e.target.value)}
/>

<textarea
  className="form-control mb-3"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Image URL"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
/>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Contact Number"
  value={contact}
  onChange={(e) => setContact(e.target.value)}
/>



      <br />

<label>
  <input
    type="checkbox"
    checked={wifi}
    onChange={(e) => setWifi(e.target.checked)}
  />
  {" "}WiFi
</label>

<br />

<label>
  <input
    type="checkbox"
    checked={food}
    onChange={(e) => setFood(e.target.checked)}
  />
  {" "}Food
</label>

<br />

<label>
  <input
    type="checkbox"
    checked={ac}
    onChange={(e) => setAc(e.target.checked)}
  />
  {" "}AC
</label>


<br />

{!isAdmin && (
<select
  className="form-control mb-3"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="">Sort By</option>
  <option value="priceLow">Price: Low to High</option>
  <option value="priceHigh">Price: High to Low</option>
  <option value="rating">Highest Rating</option>
</select>
)}


      <div className="text-center mt-4">
  <button
    className="btn btn-primary btn-lg px-5 py-2 shadow"
    onClick={addHouse}
  >
    {editingId ? "✏️ Update House" : "🏠 Add House"}
  </button>
</div>
</>
)}
<br/>
      <hr/>
    


    




      



  
  {!isAdmin && (
<>
    <div className="card shadow-sm p-4 mb-4">
  <div className="filter-card">

    <h2 className="filter-title">
      🔍 Find Your Perfect Stay
    </h2>

    <div className="row g-3">
      

      <div className="col-md-6">
        <input
          type="text"
          className="form-control filter-input"
          placeholder="📍 Search Location"
          value={filterLocation}
          onChange={(e) =>
            setFilterLocation(e.target.value)
          }
          
        />
      </div>

      <div className="col-md-6">
        <input
          type="number"
          className="form-control filter-input"
          placeholder="💰 Maximum Budget"
          value={filterPrice}
          onChange={(e) =>
            setFilterPrice(e.target.value)
          }
        />
      </div>
      <div className="filter-options mt-4">

  <label className="filter-checkbox">
    <input
      type="checkbox"
      checked={filterWifi}
      onChange={(e) => setFilterWifi(e.target.checked)}
    />
    📶 WiFi
  </label>
<br/>
  <label className="filter-checkbox">
    <input
      type="checkbox"
      checked={filterFood}
      onChange={(e) => setFilterFood(e.target.checked)}
    />
    🍽 Food
  </label>
<br/>
  <label className="filter-checkbox">
    <input
      type="checkbox"
      checked={filterAc}
      onChange={(e) => setFilterAc(e.target.checked)}
    />
    ❄ AC
  </label>

</div>

    </div>

<br />



</div>
</div>

</>
)}


{!isAdmin && (
  <>
    {favorites.length > 0 ? (
      <>
        {favorites.length > 0 && (
  <p>Total Favorites: {favorites.length}</p>
)}

        <h2 className="mb-4">
❤️ My Favorites
</h2>

        <div className="row mb-4">
          {favorites.map((house) => (
            <div className="col-md-4" key={house.id}>
              <div className="card p-3">
                <img
                  src={house.image_url}
                  alt={house.title}
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

                <h5>{house.title}</h5>

                <p>{house.location}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : (
      <p>No favorites added yet.</p>
    )}

    <hr />
  </>
)}


  <h2 className="mb-4">
  🏠 Available Houses
</h2>

  <div className="row">
    {filteredHouses.map((house) => (
    <div className="col-md-4 mb-4" key={house.id}>
      <div className="card shadow h-100 house-card">
        <div className="card-body">
        <img
  src={house.image_url}
  alt={house.title}
  className="card-img-top house-image"
  style={{
    height: "220px",
    objectFit: "cover"
  }}
/>

          <h4
 className="card-title fw-bold"
>
 {house.title}
</h4>


<span className="badge bg-warning text-dark fs-6 mb-3">
 ⭐ {house.rating}
</span>

          <p><strong>📍 Location:</strong> {house.location}</p>

          <span className="badge bg-success fs-6 mb-2">
 ₹ {house.price}
</span>

          <p><strong>⭐ Rating:</strong> {house.rating}</p>

          <p><strong>📶 WiFi:</strong> {house.wifi ? "Yes" : "No"}</p>

          <p><strong>🍽 Food:</strong> {house.food ? "Yes" : "No"}</p>

          <p><strong>❄ AC:</strong> {house.ac ? "Yes" : "No"}</p>

          <p>
            <strong>📝 Description:</strong><br />
            {house.description}
          </p>
          

{!isAdmin && (
  <button
  className={
    isFavorite(house.id)
      ? "btn btn-danger w-100 mb-2"
      : "btn btn-outline-danger w-100 mb-2"
}
  onClick={() =>
    isFavorite(house.id)
      ? removeFavorite(house.id)
      : addFavorite(house.id)
  }
>
  {isFavorite(house.id)
    ? "❤️ Remove Favorite"
    : "🤍 Add Favorite"}
</button>
)}

            
<div className="alert alert-info mt-2 contact-box">
  📞 Contact: {house.contact}
</div>
          {isAdmin && (
<>
  <button
    className="btn btn-info me-2"
    onClick={() => editHouse(house)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger"
    onClick={() => deleteHouse(house.id)}
  >
    Delete
  </button>
</>
)}

                </div>
      </div>
    </div>
  ))}
  </div>

    </div>
  );
}

export default HouseList;