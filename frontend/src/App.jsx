import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useState, useEffect } from "react";

import HouseList from "./components/HouseList";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import "./index.css";

function LandingPage() {
  return (
    <div
  className="container d-flex align-items-center justify-content-center"
  style={{
    height: "calc(100vh - 90px)",
    overflow: "hidden",
    paddingTop: "10px",
    paddingBottom: "10px"
  }}
>
      <div
        className="text-center p-4 rounded"
        style={{
          background: "white",
          maxWidth: "900px",
          width: "100%",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
          alt="House"
          style={{
            width: "180px",
            opacity: "0.95"
          }}
        />

        <h1
          className="fw-bold mt-3"
          style={{
            color: "#1f2a44"
          }}
        >
          🏠 AI Bachelor Housing Finder
        </h1>

        <p className="lead text-muted mt-3">
          Find affordable PGs, hostels and rental rooms
          near your college or workplace.
        </p>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 h-100">
              <h2>🔍</h2>
              <h5>Smart Search</h5>
              <small>
                Search by location, budget and facilities.
              </small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 h-100">
              <h2>❤️</h2>
              <h5>Favorites</h5>
              <small>
                Save houses for future comparison.
              </small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 h-100">
              <h2>📞</h2>
              <h5>Direct Contact</h5>
              <small>
                Contact owners without brokers.
              </small>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/#/login";
  };

  return (
    <HashRouter>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow p-3">

        <div className="container-fluid">

          <Link
            className="navbar-brand fw-bold fs-2"
            to="/"
          >
            🏠 BachelorNest
          </Link>

          <div className="ms-auto">

            {user ? (
              <>
                <span className="text-white me-3 fw-semibold">
                  Welcome, {user.name}
                </span>

                <button
                  className="btn btn-danger px-4"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-light me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-success"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={
            user
              ? <HouseList />
              : <LandingPage />
          }
        />

        <Route
  path="/login"
  element={
    user
      ? <HouseList />
      : <Login />
  }
/>

        <Route
  path="/register"
  element={
    user
      ? <HouseList />
      : <Register />
  }
/>

      </Routes>

    </HashRouter>
  );
}

export default App;