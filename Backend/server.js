const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer")
const { userModel } = require("./model/user.model");
const { productRouter } = require("./routes/product.route");
const { loginRouter } = require("./routes/login.route");
const { signUpRouter } = require("./routes/signup.route");
const { cartRouter } = require("./routes/cart.route");
const { userRouter } = require("./routes/user.route");
const {profileRouter}=require("./routes/profile.route")
const {orderRouter}=require("./routes/order.route")

const { authenticate } = require("./middleware/authentication");

const app = express();
app.use(express.json());

app.use(cors()); 

if (!process.env.mongoURL) {
  console.error(
    "Error: MongoDB connection URL is not defined in environment variables"
  );
  process.exit(1);
}

let connection = mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

app.get("/ping", (req, res) => {
  res.send("Pong");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("myFile"), (req, res) => {
  try {
    console.log(req.file);
    res.send({ message: "file uploaded sucessfully!!!" });
  } catch (error) {
    console.log(error);
    res.send({ error: "error" });
  }
});

app.post("/create", async (req, res) => {
  let payload = req.body;
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  try {
    let new_user = new userModel(payload);
    await new_user.save();
    res.send({
      message: "Hurray!! Successfully saved the user to the database",
    });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});


app.use("/",signUpRouter);
app.use("/", loginRouter);
app.use("/user", authenticate, userRouter);
app.use("/product", productRouter);
app.use("/profile",authenticate,profileRouter)
app.use("/cart", authenticate,  cartRouter);
app.use("/orders", authenticate, orderRouter);



if (!process.env.PORT) {
  console.error("Error: PORT is not defined in environment variables");
  process.exit(1);
}

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
