import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {

      const response = await axios.post(
        `${API_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="auth-icon">
        👤
      </div>

      <h2 className="auth-title">
        Create Account
      </h2>

      <input
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        className="btn btn-success auth-btn"
        onClick={registerUser}
      >
        Create Account
      </button>

    </div>

  </div>
);
}

export default Register;