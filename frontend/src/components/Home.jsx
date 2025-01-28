import productData from "./data.json"
import Cart from "./cart";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate=useNavigate()

    const navBarStyle = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        position: "sticky",
        top: "0",
        width: "100%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box"
    };

    const logoStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer",
    };

    const linkContainerStyle = {
        display: "flex",
        gap: "20px",
    };

    const linkStyle = {
        marginLeft: "20px",
        color: "white",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden", // Prevent horizontal scrolling
        padding: "20px",
        textAlign:"center"
    };

    const container={
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive layout
        gap: "30px",
        padding: "40px",
        backgroundColor: "#f1f1f1",

    }

    return (
        <div style={{ overflowX: "hidden" }}> {/* Prevent horizontal overflow */}
            <nav style={navBarStyle}>
                <div style={logoStyle} onClick={() => navigate("/")}>
                    E-Commerce
                </div>
                <div style={linkContainerStyle}>
                    <span style={linkStyle} onClick={() => navigate("/signup")}>
                        Sign Up
                    </span>
                    <span style={linkStyle} onClick={() => navigate("/login")}>
                        Login
                    </span>
                </div>
            </nav>
            <div style={containerStyle}>
                <h1>Welcome to the Home Page</h1>
            </div>

            <div style={container}>

                {
                    productData?.map((product) => {
                        return <Cart key={product.id} product={product}></Cart>
                    })
                }
            </div>
        </div>
    );
}

export default Home;



