const express = require("express");
const router = express.Router();
const loginController = require('../controllers/login')
const authenticateUser = require('../middlewares/authenticateUser')
const grammarController = require('../controllers/grammarCheck')
const aiDetectController = require('../controllers/aiDetectText')

router.get("/login", loginController);

router.get('/test', authenticateUser, (req, res) => res.send('test'))

router.post('/grammar-check', grammarController)

router.post('/detect-ai-text', aiDetectController)

module.exports = router;
 