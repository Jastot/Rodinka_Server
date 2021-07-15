// router with express connection
const express = require('express');

const {getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser,
    getPeople} = require('../controllers/users.js');
const router = express.Router();



router.route('/people').get(getPeople);
router.route('/user').get(getUser).post(postUser).put(putUser).delete(deleteUser);
router.route('/').get(getUsers);

// export router
module.exports = router;