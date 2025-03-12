// import React, { useEffect } from "react";

const Cart = ({ cartItems }) => {
  useEffect(() => {
    fetch("http://localhost:8080/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log("Fetched Products:", data); // Debug response
        if (Array.isArray(data)) {
          setProductData(data); // Ensure data is an array
        } else {
          console.error("Invalid product data format", data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h2>🛒 Cart Items</h2>
      {!cartItems || cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={item.productImage || "default-image.jpg"}
              alt={item.productName}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{item.productName}</h3>
            <p>₹{item.productPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
