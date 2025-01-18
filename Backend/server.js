const express = require('express')
const mongoose= require('mongoose')

const app=express()
const PORT=8084

let connection= mongoose.connect("mongodb+srv://mohammedshebinc92:5zU3VGl55Wr9xw9r@cluster0.enuvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get("/ping",(req,res) => {
    res.send("pong")
})
// ching

app.get("/",(req,res) => {
    res.send("ching")
})

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("Successfully connected to MongoDB");
    } catch (error){
        console.log(error);
    }
    
        console.log(`Server is running on port ${PORT}`)
    })