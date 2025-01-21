
function Home() {

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
        boxSizing: "border-box",
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
    };

    return (
        <div style={{ overflowX: "hidden" }}> {/* Prevent horizontal overflow */}
            <nav style={navBarStyle}>
                <span style={linkStyle} onClick={() => navigate("/signup")}>
                    Sign Up
                </span>
                <span style={linkStyle} onClick={() => navigate("/login")}>
                    Login
                </span>
            </nav>
            <div style={containerStyle}>
                <h1>Welcome to the Home Page</h1>
            </div>
        </div>
    );
}

export default Home;