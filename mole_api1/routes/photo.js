// router with express connection
const express = require('express');

const {
    putConsultations
    } = require('../controllers/users.js');
const router = express.Router();

router.route('/').put(putConsultations);
// export route

module.exports = router;