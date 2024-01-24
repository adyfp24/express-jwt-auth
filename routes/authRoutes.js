const express = require('express');
const { validateUniqueUser } = require('../middlewares/validateUniqueUser');
const { verifyToken } = require('../middlewares/verifyJWT');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', validateUniqueUser, authController.register);
router.post('/logout', verifyToken, authController.logout);

module.exports = router;