// router with express connection
const express = require('express');
const {
    addAnalysis, updateAnalysis, getAnalysis, removeAnalysis, 
    } = require('../controllers/analyzes.js');
const router = express.Router();

// routes
router.route('/addAnalysis').post(addAnalysis);
router.route('/updateAnalysis').post(updateAnalysis);
router.route('/getAnalysis').post(getAnalysis);
router.route('/removeAnalysis').post(removeAnalysis);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
});

// export router
module.exports = router;