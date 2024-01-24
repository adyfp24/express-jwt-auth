const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
// const { verifyToken } 

router.get('/me', userController.getMe);

module.exports = router;