const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 5, max: 8 },
  profileImage: { type: String, default: "" }, 
  addresses: [
    {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zip: { type: String, required: false },
    },
  ],
});
const userModel = mongoose.model("usercollection", userSchema);
module.exports = {
  userModel,
};
