import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [productData, setProductData] = useState([]); 
  const navigate = useNavigate();


  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = () => {
    fetch(`http://localhost:8080/cart` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cart Items:", data);
        if (Array.isArray(data.data)) {
          setProductData(data.data);
        } else {
          console.error("Invalid cart data format", data);
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  };

  const updateQuantity = async (productId, action) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${action}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to update quantity: ${res.status} ${res.statusText}`);;
      }

      const updatedItem = await res.json();
      console.log("Updated Item:", updatedItem);

      if (updatedItem.data && updatedItem.data.quantity !== undefined) {
        setProductData((prevData) =>
          prevData.map((item) =>
            item._id === productId
              ? { ...item, quantity: updatedItem.data.quantity } // Ensure correct key
              : item
          )
        );
      } else {
        console.error("API response missing 'quantity' field:", updatedItem);
      }
    } catch (error) {
      console.error(`Error updating quantity:`, error);
    }
  };

  
  return (
    <div>
      <h2>🛒 Cart Items</h2>
      {!productData || productData.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        productData.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={item.productId?.productImage || "default-image.jpg"}
              alt={item?.productId?.productName}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{item.productId?.productName}</h3>
            <p>₹{item.productId?.productPrice}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => updateQuantity(item._id, "decrease")}>
              -
            </button>
            <span
              style={{ margin: "0 10px", fontSize: "18px", fontWeight: "bold" }}
            >
              {item.productId?.quantity}
            </span>
            <button onClick={() => updateQuantity(item._id, "increase")}>
              +
            </button>
          </div>
        ))
      )}
      <button onClick={() => navigate("/select-address")}>
        Place Order
      </button>
    </div>

    
  );
};

export default Cart;
