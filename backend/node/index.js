const express = require("express");
const cors = require("cors");
const multer = require("multer");
require('dotenv').config();
const pdf = require("pdf-parse");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const OPENAI_API_KEY = process.env.OPENAIAPI;


app.post("/api/text/upload", upload.single("pdf"), async (req, res) => {
  console.log("Hello");

  try {
    const pdfBuffer = req.file.buffer;
    const pdfText = await extractTextFromPDF(pdfBuffer);
    const formattedText = pdfText.replace(/\n/g, " ");
    console.log("Extracted text:", formattedText);
    console.log("Request payload:", { text: formattedText });

    const response = await axios.post(
      "https://4df9-35-227-161-193.ngrok-free.app/summarizeText",
      { text: formattedText },
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    const summary = response.data;

    req.app.locals.summary = summary;

    console.log("summary", summary);

    res.json({ text: pdfText, summary: summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred during text extraction, summarization, or the external API request.",
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


app.post("/chat", async (req, res) => {
  try {
    const { text } = req.body;

    // // Adjust the prompt to instruct GPT-3 to generate "Match the Following" questions
    const gptPrompt = `
    Generate 4 "Match the Following" type questions based on the following summary: ${text}
    
    Here's an example of the desired format:
    
    {
      "question": "Match the following statements from Elon Musk with their impact on the cryptocurrency market:",
      "lhs": ["Statement 1", "Statement 2", "Statement 3"],
      "rhs": ["Impact A", "Impact B", "Impact C"],
      "answers": [1, 2, 0]
    }
    
    Please generate 4 similar objects. Each should have a question, 3 statements for the left-hand side (lhs) to be matched, and 3 options for the right-hand side (rhs), all relevant and accurate. Ensure that each answer index corresponds correctly to the options provided.Each lhs should have a unique correct match in rhs.Wrap everything inside an array.
    `;
    

    const response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
      { prompt: gptPrompt, max_tokens: 1024 },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    const completion = response.data;
    const generatedText = completion.choices[0].text;

    console.log("Generated Text: ", generatedText);
    const arrayOfObjects = JSON.parse( generatedText);
    console.log(typeof( generatedText));
    console.log(arrayOfObjects);
    res.json(arrayOfObjects);

  } catch (error) {
    console.error('An error occurred during the request:', error);
    res.status(500).json({
      error: "An error occurred during the GPT-3 API request.",
    });
  }
});


app.post('/explanation', async (req, res) => {
  try {
     const { question, answer } = req.body;
     const summary = req.app.locals.summary; // Access the global summary variable
 
     // Refactored prompt to be more concise and include the question, correct answer, and summary
     const gptPrompt = `
     Given the following question, correct answer, and summary, generate an explanation in 2-3 sentences:

     Question: ${question}
     Correct Answer: ${answer}
     Summary: ${summary}

     Explanation:
     
     `;

      const response = await axios.post(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
        { prompt: gptPrompt, max_tokens: 1024 },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      );

      const completion = response.data;
      const generatedText = completion.choices[0].text;

      console.log("Generated Text: ", generatedText);

      res.json({ explanation: generatedText });
 
     // Existing code to make the GPT-3 API call and send the response...
  } catch (error) {
     console.error('An error occurred during the request:', error);
     res.status(500).json({
       error: "An error occurred during the GPT-3 API request.",
     });
  }
 });

 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
