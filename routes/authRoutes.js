const express = require('express');
const { validateUniqueUser } = require('../middlewares/validateUniqueUser');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login');
router.post('/register', validateUniqueUser, authController.register);
router.post('/logout');

module.exports = router;