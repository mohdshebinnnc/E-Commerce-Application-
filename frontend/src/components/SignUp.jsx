import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setError("All fields are required");
        } else if (!email.includes("@")) {
            setError("Enter a valid email");
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters");
        } else {
            setError("");
            alert("Form submitted!");
        }
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
        width: "90%",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        textAlign: "center",
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={headingStyle}>Sign Up</h2>
                <div style={inputContainerStyle}>
                    <label style={labelStyle} htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle} htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle} htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={buttonStyle}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;