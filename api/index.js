const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json()); //makes possible to send json object
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    //userFindAndModify: true,
  })
  .then(console.log("Connected to Mongodb"))
  .catch((err) => console.log(err));

//using multer to store images selected from file
const storage = multer.diskStorage({
  //indicating destination
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  //indicating filename (provided)
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//uploading image file
const upload = multer({ storage: storage });
//url to upload single file
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});
