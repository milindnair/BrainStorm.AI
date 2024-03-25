const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdf = require("pdf-parse");

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define your route
app.post('/api/text/upload', upload.single('pdf'), async (req, res) => {
    console.log("Hello");

  try {
    const pdfBuffer = req.file.buffer;
    const pdfText = await extractTextFromPDF(pdfBuffer);

    res.json({ text: pdfText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during text extraction.' });
  }
});

// Function to extract text from PDF
const extractTextFromPDF = (pdfBuffer) => {
  return new Promise((resolve, reject) => {
    pdf(pdfBuffer).then(function(data) {
      resolve(data.text);
    }).catch(function(error) {
      reject(error);
    });
  });
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
