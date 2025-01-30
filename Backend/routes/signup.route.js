const express=require('express')
const {userModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

require('dotenv').config()
const app=express()

let signUpRouter=express.Router()


signUpRouter.post("/signup" , async (req,res) => {
    console.log(req.body)
    const {name,email,password}=req.body
    const userPresent=await userModel.findOne({email})
    if(userPresent?.email){
        res.send("Try loggin in ,already exist")
    }else{
        try {
            bcrypt.hash(password,4,async function (err,hash){
                const user = new userModel({name,email,password:hash})
                await user.save()
                res.send("Sign up successfull")
            })
        } catch (error) {
            console.log(err)
            res.send("Something went wrong,pls try again later")
        }
    }
})

module.exports={signUpRouter}