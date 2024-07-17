const express = require('express');
const { register, login, saveChat } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/save-chat', saveChat);

module.exports = router;
