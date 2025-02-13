const mongoose=require("mongoose")

const cartSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'Product'
    },
    Quantity:{
        tpye:Number,
        required:True
    },
    userID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User'
    }
})
const cartModel = mongoose.model('productCollection',cartSchema)

module.exports = {cartModel}

