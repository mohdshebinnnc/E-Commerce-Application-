const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "usercollection", required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  status: { type: String, default: "" },
}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);
module.exports = { orderModel };
