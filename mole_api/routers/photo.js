// router with express connection
const express = require('express');
const {
    uploadPhoto,
    getPhoto,
    requestCNN
    } = require('../controllers/photo.js');
const router = express.Router();


// routes
router.route('/uploadPhoto').post(uploadPhoto);
router.route('/getPhoto').post(getPhoto);
router.route('/requestCNN').post(requestCNN);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
});

// export router
module.exports = router;