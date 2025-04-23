  import { useState } from "react";
  import { useNavigate } from "react-router-dom";


  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        console.log("🔹 Full Response:", response);

        // 🔥 Check if the response is actually JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response from server");
        }

        const data = await response.json(); // ✅ Parse JSON safely
        console.log(data, "aaaaa")
        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          console.log("✅ Token Saved:", localStorage.getItem("token"));
          alert("Login successful!");
          // console.log("Token:", data.token);
          navigate("/")
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.log("Error:", error);
        // alert("Something went wrong. Please try again!");
        alert(error.message)
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
      overflowX: "hidden",
    };

    const formStyle = {
      width: "100%",
      maxWidth: "360px", // Reduced max width for the form
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    };

    const inputStyle = {
      width: "100%",
      maxWidth: "320px", // Restrict width for input fields
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    };

    const buttonStyle = {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      textAlign: "center",
    };

    const headingStyle = {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    };

    return (
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2 style={headingStyle}>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    );
  };

  export default Login;
