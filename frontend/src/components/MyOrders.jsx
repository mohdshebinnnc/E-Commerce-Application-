import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          console.error("No token found, please login.");
          return;
        }

        const response = await axios.get("http://localhost:8080/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Price:</strong> ₹{order.total}</p>
              <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
