const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCollection",
        required: true
    },
    // productName: {
    //     type: String,
    //     required: true
    // },
    // productImage: {
    //     type: String,
    //     required: true
    // },
    // productPrice: {
    //     type: Number,
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = { cartModel };
