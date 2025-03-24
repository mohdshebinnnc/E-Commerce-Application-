import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">E-CART</h2>

        {/* Toggle Button for Mobile */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
          </li>
          <li>
            <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>Sign Up</Link>
          </li>
          <li>
            <Link to="/productForm" className={location.pathname === "/productForm" ? "active" : ""}>Product Form</Link>
          </li>
          <li>
            <Link to="/cart-item" className={location.pathname === "/cart-item" ? "active" : ""}>Cart</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          </li>
          <li>
            <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
  