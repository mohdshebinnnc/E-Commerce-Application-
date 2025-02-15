const express = require("express");
const { cartModel } = require("../model/cart.model");

let cartRouter = express.Router();


cartRouter.get("/",async(req,res) => {
    const {userID}=req.body

    try {
        const cartProducts=await cartModel.find({userId:userID}).populate("productId")
        res.send({"message":"Successfully retrived tge cart data from database",data:cartProducts})
    } catch (error) {
        res.send({"Error-message":error})
    }
})

cartRouter.post("/add-to-cart", async (req, res) => {
    const { productId,quantity,userId } = req.body;
    
    try {
        // Check if product already exists in user's cart
        let existingCartItem = await cartModel.findOne({ 
            productId,
            quantity, 
            userId
        });

        if (existingCartItem) {
            // Update quantity if product exists
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            res.status(200).send({ 
                message: "Product quantity updated in cart" 
            });
        } else {
            // Add new product to cart
            let newCartItem = new cartModel({
                productId,
                userId,
                quantity
            });
            await newCartItem.save();
            res.status(201).send({ 
                message: "Product added to cart successfully" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ 
            error: "Failed to add product to cart" 
        });
    }
});

cartRouter.get("/:userId", async (req, res) => {
    try {
        const cartItems = await cartModel.find({ 
            userId: req.params.userId 
        }).populate('productId');
        
        res.status(200).send(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send({ 
            error: "Failed to fetch cart items" 
        });
    }
});



cartRouter.delete("/remove/:cartItemId", async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.cartItemId);
        res.status(200).send({ 
            message: "Item removed from cart successfully" 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ 
            error: "Failed to remove item from cart" 
        });
    }
});

module.exports={cartRouter}
