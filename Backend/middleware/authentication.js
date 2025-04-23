const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log("🔹 Received Token:", token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // console.log("✅ Token Decoded:", decoded);

            if (decoded) {
                req.body.email = decoded.email;
                req.body.userID = decoded.userID;
                next(); 
            } else {
                console.log("Token verification failed");

                return res.status(401).json({ msg: "Login Please" }); 
            }
        } catch (error) {
            return res.status(401).json({ msg: "Invalid or Expired Token" });
        }
    } else {
        return res.status(401).json({ msg: "Login Please" });
    }
};

module.exports = { authenticate };
