const express = require('express');
const {
  login,
  getMe,
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
