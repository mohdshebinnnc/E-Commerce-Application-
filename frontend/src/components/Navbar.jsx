import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional: Create a CSS file for styling

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/productForm">Product Form</Link>
        </li>
        <li>
          <Link to="/cart-item">Cart</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
