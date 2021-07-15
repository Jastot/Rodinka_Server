// router with express connection
const express = require('express');

const {
    getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser,
    getPeople
    } = require('../controllers/users.js');
const router = express.Router();

router.route('/').get(getUsers).post(postUser);
router.route('/people').get(getPeople);
router.route('/:id').get(getUser).put(putUser).delete(deleteUser);


// export route

module.exports = router;