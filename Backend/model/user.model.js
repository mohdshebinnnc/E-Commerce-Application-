const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:5,max:8},
    // age:{type:Number,required:true},


})
const userModel=mongoose.model("usercollection",userSchema)
module.exports={
    userModel
}




    