import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar"; // Importing the Navbar component
import Card from "./components/Card";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
    alert(`${product.productName} added to cart`);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/cart-item" element={<Cart cartItems={cartItems} />} />
        <Route path="/cart" element={<Card addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
