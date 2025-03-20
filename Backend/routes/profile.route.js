const express=require("express")
const profileRouter=express.Router()
const {userModel}=require("../model/user.model")

profileRouter.get("/:userId",async(req,res)=>{
    try {
        const {userId}=req.params
        const user=await userModel.findById(userId)

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        res.json({
            name:user.name,
            email: user.email,
            profileImage: user.profileImage,
            addresses: user.addresses,
        })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

profileRouter.post("/add-address",async(req,res)=>{
    try {
        const {userId, street, city, state, zip}=req.body

        if(!userId ||  !street || !city || !state || !zip){
            return res.status(400).json({ error: "All fields are required" });
        }

        const user=await userModel.findById(userId)
        if (!user) return res.status(404).json({ error: "User not found" });

        user.addresses.push({street, city, state, zip})
        await user.save()
        res.json({ message: "Address added successfully", user });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})




module.exports = {profileRouter}