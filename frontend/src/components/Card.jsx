import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = ({ product, onEdit, addToCart }) => {
  const navigate = useNavigate();
  const productId=product._id;

  // ✅ Prevent rendering if product is undefined or null
  if (!product) {
    return <p>No product added...</p>;
  }                                                                                                                   

  const handleClick = () => {
    navigate(`/editProduct/${product._id}`);
  };

  const handlecart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");  // ✅ Ensure `userId` is stored
  
    if (!token) {
      alert("You need to log in first!");
      return;
    }
  
    if (!userId) {
      alert("User ID is missing! Please log in again.");
      return;
    }
  
    const cartData = {
      productId: product._id,
      quantity: 1,  // ✅ Default quantity
      userId: userId
    };
  
    console.log("📡 Sending request to backend:", cartData); // 🔍 Debugging
  
    try {
      const response = await fetch("http://localhost:8080/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cartData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to add to cart");
      }
  
      alert(`${product.productName} added to cart!`);
    } catch (error) {
      console.error("🚨 Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const token=localStorage.getItem("token")
        const response = await axios.delete(
          `http://localhost:8080/product/delete/${product._id}`,
          {
            headers:{
              "Authorization":`Bearer ${token}`
            }
          }
        );
        alert(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cartStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const h3Style = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    margin: "10px 0",
  };

  const pStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  };

  const priceStyle = {
    fontSize: "18px",
    color: "#e60000",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "15px",
  };

  const buttonStyle = {
    flex: "1",
    padding: "8px",
    fontSize: "14px",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const editButton = {
    flex: "1",
    padding: "8px",
    fontSize: "14px",
    color: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "red",
    cursor: "pointer",
  };

  return (
    <div className="cart" style={cartStyle}>
      <img
        src={product.productImage || "default-image.jpg"}
        alt={product.productName || "No Name"}
        style={imgStyle}
      />
      <h3 style={h3Style}>{product.productName || "No Product Name"}</h3>
      <p style={pStyle}>
        {product.productDescription || "No description available."}
      </p>
      <p style={priceStyle}>₹{product.productPrice ?? "0"}</p>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handlecart}>
          Add to Cart
        </button>
        <button style={buttonStyle}>Buy Now</button>
        <button style={buttonStyle}>Wishlist</button>
        <button
          style={editButton}
          onClick={() => {
            handleClick();
            onEdit?.(product);
          }}
        >
          Edit
        </button>
        <button style={editButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

// ✅ Make `product` optional instead of required to avoid errors
Card.propTypes = {
  product: PropTypes.shape({
    productImage: PropTypes.array,
    productName: PropTypes.string,
    productDescription: PropTypes.string,
    productPrice: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  addToCart: PropTypes.func,
};

export default Card;
