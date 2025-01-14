const express = require("express");
const router = express.Router();
const loginController = require('../controllers/login')
const authenticateUser = require('../middlewares/authenticateUser')
const grammarController = require('../controllers/grammarCheck')
const aiDetectController = require('../controllers/aiDetectText')
const similaritySearchController = require('../controllers/similaritySearch')

router.get("/login", loginController);

router.get('/test', authenticateUser, (req, res) => res.send('test'))

router.post('/grammar-check', grammarController)

router.post('/detect-ai-text', aiDetectController)

router.post('/similarity-search', similaritySearchController)

module.exports = router;
 