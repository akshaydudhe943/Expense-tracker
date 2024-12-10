import React from "react";
import { Link } from "react-router-dom";
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default HomePage;
