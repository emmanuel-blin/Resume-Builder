require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 4000;

console.log(__dirname);
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

app.use(express.urlencoded( { extended: true} ));
app.use(express.json());
app.use(cors());
// Multer Config
app.use("/uploads", express.static("uploads")); // Enables Node.js to serve the content from "./Uploads" 

app.get("/api", (req, res) => {
   res.json({
      message: "Hello World",
   });
});

app.listen(PORT, () => {
   console.log(`Server is listening on ${PORT}`);
});

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
   cb(null, "uploads");
},
filename: (req, file, cb) => {
   cb(null, Date.now() + path.extname(file.originalname));
},
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 5 }, // {filesize: width px * height px * max upload MB }
});


app.post("/resume/create", upload.single("headshotImage"), async(req, res) => {
   const {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      workHistory,
   } = req.body;

   console.leg(req.body);

   res.json({
      message: "Request successful !",
      data: {},
   });
});