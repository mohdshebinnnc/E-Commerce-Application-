const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");

const signUpRouter = express.Router();

signUpRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userPresent = await userModel.findOne({ email });
    if (userPresent) {
      return res
        .status(400)
        .json({ msg: "User already exists. Try logging in!" });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "Signup successful", newuser: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong. Please try again later." });
  }
});

module.exports = { signUpRouter };
