const mongoose=require("mongoose")

const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productCollection'
    },

    quantity:{
        type:Number,
        required:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usercollection'
    }

})
const cartModel = mongoose.model('cartCollection',cartSchema)

module.exports = {cartModel}
