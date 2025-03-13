const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
  console.log("🔹 Received login request", req.body);

  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Login failed! Please register first" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ msg: "Login Failed! Enter the correct password" });
    }

    const token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log("token recieved",token)
    res.json({ msg: "Login Successful",token, user: { _id: user._id} });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ msg: "Something went wrong!", error: error.message }); // ✅ Force JSON format
  }
});

module.exports = { loginRouter };
