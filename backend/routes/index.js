const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const authenticateUser = require("../middlewares/authenticateUser");
const grammarController = require("../controllers/grammarCheck");
const aiDetectController = require("../controllers/aiDetectText");
const similaritySearchController = require("../controllers/similaritySearch");
const outputValidatorController = require("../controllers/outputValidator");
const imageQAController = require("../controllers/imageQA");
const multer = require("multer");
const path = require("path");

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Give the file a unique name
  },
});

const upload = multer({ storage: storage });

router.get("/login", loginController);

// router.get("/test", authenticateUser, (req, res) => res.send("test"));

router.post("/grammar-check", grammarController);

router.post("/detect-ai-text", aiDetectController);

router.post("/similarity-search", similaritySearchController);

router.post("/output-validator", outputValidatorController);

router.post("/image-qa", upload.single("image"), imageQAController);

module.exports = router;
