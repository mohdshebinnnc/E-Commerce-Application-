const express = require("express");
const orderRouter = express.Router();
const { userModel } = require("../model/user.model");
const { orderModel } = require("../model/order.model");

orderRouter.post("/place-order", async (req, res) => {
  try {
    const { userId, items, total, address } = req.body;

    if (!userId || !items.length || !total || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newOrder = new orderModel({
      userId,
      items,
      total,
      address,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

orderRouter.post("/get-orders",async(req,res)=>{
  try {
    const {email}=req.body

    if(!email){
      return res.status(400).json({error: "Email is required" })
    } 

    const user=await userModel.findOne({email})
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await orderModel.find({ userId: user._id });
    res.status(200).json({ message: "Orders retrieved successfully", orders });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

orderRouter.get("/my-orders", async (req, res) => {
  try {
    const userId = req.body.userID; 

    const orders = await orderModel.find({ userId });

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { orderRouter };
