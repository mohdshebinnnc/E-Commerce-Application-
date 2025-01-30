const express=require('express')
const {userModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

require('dotenv').config()
const app=express()

let loginRouter=express.Router()


loginRouter.post("/login",async (req,res) => {

    const {email,password}=req.body

    try {
        let user =await userModel.find({email})

        if (user.length > 0) {
            let hashed_password=user[0].password;
            bcrypt.compare(password,hashed_password,function(err,result){
                if (result) {
                    const token=jwt.sign({"userID": user[0]._id},process.env.SCRET_KEY)
                    res.send({"msg":"Login Successfull","token": token})
                }else{
                    res.send("Login Failed! Enter the correct password")
                }
            })
        }else{
            res.send("Login failed! Please register first")
        }
    } catch (error) {
        res.json({"Message": "Something went wrong!",error})
    }
})

module.exports={loginRouter}