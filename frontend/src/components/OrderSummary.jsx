import React, { useEffect, useState } from 'react'
import axios from "axios"

const OrderSummary = () => {
    const [cartItems,setCartItems]=useState([])
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0)
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
      axios.get("http://localhost:8080/cart", { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
              console.log("🔍 Full API Response:", response.data);
  
              const cartData = response.data.data.map(item => ({
                  productId: item.productId?._id || item.productId,
                  name: item.productId?.productName || "Unknown Product",  // ✅ Fix name
                  price: Number(item.productId?.productPrice) || 0,  // ✅ Fix price
                  quantity: Number(item.quantity) || 1
              }));
  
              console.log("✅ Processed Cart Data:", cartData);
  
              setCartItems(cartData);
  
              const calculatedTotal = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
              console.log("💰 Calculated Total Price:", calculatedTotal);
  
              setTotalPrice(calculatedTotal);
          })
          .catch((error) => {
              console.error("❌ Error fetching cart data:", error);
          });
  
      const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
      setSelectedAddress(storedAddress);
  }, []);
  
  
  
    


    const handlePlaceOrder=async()=>{
        if (!userId || !token) {
            alert("User not authenticated");
            return;
        }

        if (!cartItems.length) {
            alert("Cart is empty");
            return;
        }

        const address = selectedAddress && selectedAddress.street ? {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zip: selectedAddress.zip
      } : null;
  
      if (!address) {
          alert("No delivery address selected");
          return;
      }

        const orderData = {
          userId,
          items: cartItems.map(item => ({
              productId: item.productId, // Only send ID
              quantity: item.quantity
          })),
          total: totalPrice,
          address: {
            street: selectedAddress.street,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zip: selectedAddress.zip
        }
        };

        console.log("📦 Order Data Sent:", JSON.stringify(orderData, null, 2));

        try {
            const response = await axios.post(
                "http://localhost:8080/orders/place-order",
                orderData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                alert("Order placed successfully!");
                localStorage.removeItem("cart");
                localStorage.removeItem("selectedAddress");
                setCartItems([]);
                setSelectedAddress(null);
                setTotalPrice(0);
            }
        } catch (error) {
            console.error("Error placing order:", error.response?.data || error);
            alert("Failed to place order");
        }
    }


  return (
    <div>
      <h2>Order Summary</h2>

      {/* 🛒 Ordered Products */}
      <h3>Products</h3>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <p><strong>{item.name}</strong></p>
            <p>Price: ${item.price} x {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}

      {/* 📍 Selected Address */}
      <h3>Delivery Address</h3>
      {selectedAddress ? (
        <p>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip}</p>
      ) : (
        <p>No address selected</p>
      )}

      {/* 💰 Total Price */}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      {/* ✅ Place Order Button */}
      <button onClick={handlePlaceOrder} style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
        Place Order
      </button>
    </div>
  )
}

export default OrderSummary
