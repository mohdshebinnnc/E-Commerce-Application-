const express=require('express')
const mongoose=require('mongoose')
const multer=require('multer')

const {userModel} =require("./model/user.model")

const app=express()
const PORT=8084

app.use(express.json())

let connection= mongoose.connect("mongodb+srv://mohammedshebinc92:5zU3VGl55Wr9xw9r@cluster0.enuvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


app.get('/ping',(req,res)=>{
    res.send("Pong")
})

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+"-"+file.originalname)
    }
});

const upload=multer({storage:storage});

app.post("/upload",upload.single("myFile"),(req,res)=>{
    try{
        console.log(req.file)
        res.send({"message":"file uploaded sucessfully"});
    }catch(error){
        console.log(error);
        res.send({error:"error"})
    }
})
app.post('/create',async(req,res)=>{
    let payload=req.body
    console.log(payload)
    try{
        let new_user=new userModel(payload);
        await new_user.save();
        res.send({"message":"Hurray! Successfully saved the user to the database"})
    }
    catch(error){
        console.log(error);
        res.send({"error":error})
    }
})

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("Successfully connected to mongoDb")
    }
    catch(error){
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})