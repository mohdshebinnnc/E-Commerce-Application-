import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>🛒 Cart Items</h2>
      {cartItems.length === 0 ? (
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
