import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password,
        }
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data)
    );

    alert("Login Successful");

    window.location.href = "/#/";

} catch (error) {

    localStorage.removeItem("user");

    alert("Invalid email or password");
}
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="auth-icon">
        🔐
      </div>

      <h2 className="auth-title">
        Login
      </h2>

      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary auth-btn"
        onClick={loginUser}
      >
        Login
      </button>

    </div>

  </div>
);
}

export default Login;