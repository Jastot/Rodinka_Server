// router with express connection
const express = require('express');
const {getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser,
    getPeople} = require('../controllers/users.js');
const router = express.Router();

// routes
router.route('/people').get(getPeople);
router.route('/user').get(getUser).post(postUser).put(putUser).delete(deleteUser);
router.route('/').get(getUsers);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
})

// export router
module.exports = router;