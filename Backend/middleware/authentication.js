const jwt=require("jsonwebtoken");
require('dotenv').config()

console.log(process.env.SCRET_KEY)

const authenticate=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded=jwt.verify(token)
    }
}

