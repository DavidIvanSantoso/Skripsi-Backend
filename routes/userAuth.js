const express = require('express');
const router = express.Router();
const authController = require('../controllers/userAuthController');

router.post('/', authController.userLogin);

module.exports = router;