import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = ({ onEdit }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        fetch(`http://localhost:8080/product/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}: Unauthorized request`);
            }
            return res.json();
        })
        .then((res) => {
            setProduct(res.data);
        })
        .catch((err) => {
            console.log("Fetch error:", err);
            setError("Failed to fetch product. Please check your login.");
        });
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setProduct({
                ...product,
                [name]: files[0],
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { productName, productDescription, productPrice, productImage } = product;

        if (!productName || !productDescription || !productPrice || !productImage) {
            setError('All fields are required');
            return;
        } else {
            setError('');
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productImage', productImage);

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/product/update/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}: Unauthorized`);
            }
            res.json()
        })
        .then((data) => {
            console.log("Updated product data:", { ...product, id }); // Log the updated product data
            alert(data.message);
            onEdit({ ...product, id }); // Call the onEdit callback with the updated product
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to update product. Check your login.");
        });
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
    };

    const formStyle = {
        width: "100%",
        maxWidth: "360px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    };

    const inputContainerStyle = {
        marginBottom: "15px",
    };

    const inputStyle = {
        width: "100%",
        maxWidth: "300px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
    };

    const labelStyle = {
        marginBottom: "5px",
        display: "block",
        fontWeight: "bold",
        color: "#555",
    };

    const errorStyle = {
        color: "red",
        marginBottom: "15px",
        fontSize: "14px",
    };

    const buttonStyle = {
        padding: "12px",
        width: "100%",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        textAlign: "center",
    };

    return (
        <div>
            <div style={containerStyle}>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <h2 style={headingStyle}>Edit Product</h2>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle} htmlFor="productName">
                            Product Name:
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product?.productName || ""}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle} htmlFor="productDescription">
                            Product Description:
                        </label>
                        <input
                            type="text"
                            id="productDescription"
                            name="productDescription"
                            value={product?.productDescription || ""}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle} htmlFor="productPrice">
                            Product Price:
                        </label>
                        <input
                            type="text"
                            id="productPrice"
                            name="productPrice"
                            value={product?.productPrice || ""}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle} htmlFor="productImage">
                            Product Image:
                        </label>
                        <input
                            type="file"
                            id="productImage"
                            name="productImage"
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    {error && <p style={errorStyle}>{error}</p>}
                    <button type="submit" style={buttonStyle}>
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
