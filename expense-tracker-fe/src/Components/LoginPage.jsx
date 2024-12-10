import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    setError(""); // Clear any previous error messages
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });
      alert("Login Successful!");
      localStorage.setItem("token", response.data.jwt); // Save token
      navigate("/expenses"); // Redirect to expenses page
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unexpected error occurred.";
      setError(`Login Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="logincontent">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </div>
  );
}

export default LoginPage;
