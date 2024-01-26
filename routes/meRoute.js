const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/verifyJWT')

router.get('/me', verifyToken, userController.getMe);

module.exports = router;