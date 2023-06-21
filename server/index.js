require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 4000;

const API_KEY = process.env.REACT_APP_API_KEY;

//  TODO, figure out why API key is not working !!, seems to be the only problem so far 
app.use(express.urlencoded( { extended: true} ));
app.use(express.json());
app.use(cors());
// Multer Config
app.use("/uploads", express.static("uploads")); // Enables Node.js to serve the content from "./Uploads"


const generateID = () => Math.random().toString(36).substring(2, 10);


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


const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const ChatGPTFunction = async(text) => {
   const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.6,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 1,
      pressence_penalty: 1,
   });
   return response.data.choices[0].text;
};


let database = [];

app.post("/resume/create", upload.single("headshotImage"), async(req, res) => {
         const {
            fullName,
            currentPosition,
            currentLength,
            currentTechnologies,
            workHistory, // JSON format
         } = req.body;

         const workArray = JSON.parse(workHistory); // An array

         // Group the value into an object
         const newEntry = {
            id: generateID(),
            fullName,
            image_url: `http://localhost:4000/uploads/${req.file.filename}`,
            currentPosition,
            currentLength,
            currentTechnologies,
            workHistory: workArray,
         };


      // The job description prompt
      const prompt1 = `I am writting a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years. \n I write in the technologies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume (first person writing)? )`;
      //  The job responsabilities prompt
      const prompt2 = `I am writting a resume, my detail are \n name: ${fullName} \n  role: ${currentPosition} (${currentLength} years. \n I write in the technolegies: ${currentTechnologies}. \n Can you write 10 points for a resume on what I am good at ?`;

      // Loop through the array of work history and return string data of all the work experiences
      const remaindeText = () => {
         let stringText = "";
         for (let i = 0; i < workArray.length; i++) {
            stringText += `${workArray[i].name} as a ${workArray[i].position}.`;
         }
         return stringText;
      };

      //  The job achievement prompt
      const prompt3 = `I am writting a resume, my detail are \n name: ${fullName} \n  role: ${currentPosition} ${currentLength} years. \n During my years I worked at ${workArray.length} companies. ${remaindeText()}. \n Can you write me a 50 words for each company separated in numbers of my succession in the company (in first person ?)`;


      // Generate a chatGPT-3.5 result
      const objective = await ChatGPTFunction(prompt1);
      const keypoints = await ChatGPTFunction(prompt2);
      const jobResponsabilities = await ChatGPTFunction(prompt3);
      //  put them into an object
      const chatgptData = { objective, keypoints, jobResponsibilities };
      
      const data = {...newEntry, chatgptData};
      database.push(data);


      res.json({
         message: "Request successful!",
         data,
      });

});



app.listen(PORT, () => {
   console.log(`Server is listening on ${PORT}`);
});