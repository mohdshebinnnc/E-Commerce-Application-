const express=require('express')
const {userModel}=require("../model/user.model")

const userRouter=express.Router()

userRouter.get("/profile",async(req,res) => {
    const {userId}=req.body

    try {
        const User=await userModel.findById(userId)

        if(!User){
            return res.status(404).json({message:"User not found"})
        }
        res.json(User)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

module.exports={userRouter}