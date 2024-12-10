import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/RegisterPage.css";

function RegisterPage() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!userDetails.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!userDetails.password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setError(""); // Clear errors before making the API call
      await axios.post("http://localhost:8080/api/auth/signup", userDetails);
      alert("Registration successful");
      navigate("/expenses");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={userDetails.username}
          onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
