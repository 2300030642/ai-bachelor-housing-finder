import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import HouseList from "./components/HouseList";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import "./index.css";

function App() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/#/";
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
                <span
                  className="text-white me-3 fw-semibold"
                >
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
          element={<HouseList />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </HashRouter>
  );
}

export default App;