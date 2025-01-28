const express=require("express")
const multer=require("multer")
const { productModel } = require("../model/product.model")

let productRouter=express.Router()


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+"-"+file.originalname)
    }
});

const upload = multer({ storage: storage })


productRouter.post("/create",upload.array('productImage',12),async(req,res) => {

    try {
        const {productName,productDescription,productPrice}=req.body

    const imgPaths=req.files.map((file) =>`/uploads${file.filename}` )

    const newProduct= new productModel({
        productName,
        productDescription,
        productPrice,
        productImages:imgPaths
    });


    await newProduct.save()
    res.json({"message":"Hurray! Successfully added the product on database",product:newProduct})

    } catch (error) {
        console.log(error)
        res.json({error})
    }

})

module.exports={productRouter}