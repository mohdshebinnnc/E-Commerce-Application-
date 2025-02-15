const express = require('express');
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();
const app = express();

let loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (user) {
            let hashed_password = user.password;
            bcrypt.compare(password, hashed_password, function(err, result) {
                if (result) {
                    const token = jwt.sign({ "userID": user._id }, process.env.SECRET_KEY);
                    res.send({ "msg": "Login Successful", "token": token });
                } else {
                    res.send("Login Failed! Enter the correct password");
                }
            });
        } else {
            res.send("Login failed! Please register first");
        }
    } catch (error) {
        res.json({ "Message": "Something went wrong!", error });
    }
});

module.exports = { loginRouter };
