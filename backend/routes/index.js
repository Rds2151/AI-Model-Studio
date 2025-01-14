const express = require("express");
const router = express.Router();
const loginController = require('../controllers/login')
const authenticateUser = require('../middlewares/authenticateUser')
const grammarController = require('../controllers/grammarCheck')

router.get("/login", loginController);

router.get('/test', authenticateUser, (req, res) => res.send('test'))

router.post('/grammar-check', grammarController)

module.exports = router;
 