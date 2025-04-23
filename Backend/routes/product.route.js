const express = require("express");
const multer = require("multer");
const { productModel } = require("../model/product.model");

let productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const product = await productModel.find();
        res.send({ "message": "Successfully retrieved the data from the database", data: product });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ "Error-message": "Failed to retrieve products" });
    }
});

productRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ "message": "Product not found" });
        }
        res.send({ "message": "Successfully retrieved the data from the database", data: product });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ "Error-message": "Failed to retrieve product" });
    }
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

productRouter.post("/create", upload.array('productImage', 12), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;

        const imgPaths = req.files.map((file) => `/uploads/${file.filename}`);

        const newProduct = new productModel({
            productName,
            productDescription,
            productPrice,
            productImages: imgPaths
        });

        await newProduct.save();
        res.json({ "message": "Hurray! Successfully added the product to the database", product: newProduct });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Failed to create product" });
    }
});

productRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send({ "message": "Product not found" });
        }
        res.status(200).send({ "message": "Successfully deleted the product", data: deletedProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ "error": "Failed to delete product" });
    }
});

productRouter.put("/update/:id", multer().array('productImage', 12), async (req, res) => {
    const id = req.params.id;
    const { productName, productDescription, productPrice } = req.body;
    const productImages = req.files.map((file) => `/uploads/${file.filename}`);

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            productName,
            productDescription,
            productPrice,
            productImages: productImages
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ "message": "Product not found" });
        }
        res.status(200).send({ "message": "Successfully updated the product", data: updatedProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ "error": "Failed to update product" });
    }
});


module.exports = { productRouter };
