const express = require("express");
const { cartModel } = require("../model/cart.model");

let cartRouter = express.Router();


cartRouter.get("/", async (req, res) => {
    try {
        const cartProducts = await cartModel.find().populate("productId");
        console.log("Cart API Response:", cartProducts); 
        res.send({ message: "Successfully retrieved cart data", data: cartProducts });
    } catch (error) {
        console.error("Cart Fetch Error:", error);
        res.status(500).send({ error: "Failed to fetch cart items" });
    }
});

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


cartRouter.put("/increase/:cartItemId", async (req, res) => {
    try {
        const cartItem = await cartModel.findById(req.params.cartItemId);
        if (!cartItem) return res.status(404).send({ message: "Cart item not found" });

        cartItem.quantity += 1;
        await cartItem.save();

        res.status(200).send({ message: "Product quantity increased", data: cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to increase product quantity" });
    }
});


cartRouter.put("/decrease/:cartItemId", async (req, res) => {
    try {
        const cartItem = await cartModel.findById(req.params.cartItemId);
        if (!cartItem) return res.status(404).send({ message: "Cart item not found" });

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            res.status(200).send({ message: "Product quantity decreased", data: cartItem });
        } else {
            await cartModel.findByIdAndDelete(req.params.cartItemId);
            res.status(200).send({ message: "Product removed from cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to decrease product quantity" });
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
