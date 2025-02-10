const express=require("express")
const multer=require("multer")
const { productModel } = require("../model/product.model")

let productRouter=express.Router()

productRouter.get("/",async(req,res) => {
    try {
        const product=await productModel.find()
        res.send({"message": "Successfully retrived the data from database",data:product})
    } catch (error) {
        res.send({"Error-message":error})
    }
})

productRouter.get("/:id",async(req,res) => {
    let id=req.params.id
    try {
        const product=await productModel.findById(id)
        res.send({"message": "Successfully retrived the data from database",data:product})
    } catch (error) {
        res.send({"Error-message":error})
    }
})


productRouter.delete("/delete/:id",async(req,res) => {

    let id=req.params.id

    try {
        let deletedProduct=await productModel.findByIdAndDelete(id)

        if(!deletedProduct){
            res.status(404).send({"message":"Product Not found"})
        }
        res.status(200).send({"message":"Successfully deleted the product"})
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
})

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