const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdf = require("pdf-parse");
const axios = require("axios"); 
const https = require("https");

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/api/text/upload", upload.single("pdf"), async (req, res) => {
 console.log("Hello");

 try {
    const pdfBuffer = req.file.buffer;
    const pdfText = await extractTextFromPDF(pdfBuffer);
    const formattedText = pdfText.replace(/\n/g, ''); 
    console.log("Extracted text:", formattedText);
    console.log("Request payload:", { text: formattedText });

  
    const response = await axios.post(
      "https://c72b-34-139-118-179.ngrok-free.app/summarizeText",
      { text: formattedText }, 
      {
         httpsAgent: new https.Agent({
           rejectUnauthorized: false,
         }),
      }
     );
     
    const summary = response.data;

    console.log("summary",summary); 

    res.json({ text: pdfText, summary: summary });
 } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during text extraction, summarization, or the external API request.",
    });
 }
});


const extractTextFromPDF = (pdfBuffer) => {
 return new Promise((resolve, reject) => {
    pdf(pdfBuffer)
      .then(function (data) {
        resolve(data.text);
      })
      .catch(function (error) {
        reject(error);
      });
 });
};


app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
