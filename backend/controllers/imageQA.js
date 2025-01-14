require("dotenv").config();
const path = require("path");
const fs = require('fs')
const analyzeImageWithPython = require('../python-image/analyzeImageWithPython')

const imageQA = (req, res, next) => {
  const input = req.body;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  console.log("File uploaded:", req.file);
  const image = req.file;
  const context = req.body.context;

  if (!context) {
    return res.status(400).send("Missing context.");
  }

  console.log("Sending to Image QA request for input:", context);

  // Get the uploaded file path
  const imagePath = path.join(__dirname, "../uploads", req.file.filename);
  const userContext = req.body.context;

  // Send the image to the Python backend for analysis
  analyzeImageWithPython(imagePath, userContext)
	  .then((result) => {
		  res.status(200).json({'statusCode':200, 'body' : result});  
		  // Remove the file after analysis
		  fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`File ${imagePath} deleted successfully`);
            }
        });
	  })
	  .catch((err) => {
		  console.error("Error during analysis:", err);
		  res.status(500).json({ error: "Error analyzing the image." });
	  });
};

module.exports = imageQA;
