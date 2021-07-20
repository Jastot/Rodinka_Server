// router with express connection
const express = require('express');
const {
   addOperation, updateOperation, getOperation, removeOperation
    } = require('../controllers/operations.js');
const router = express.Router();

// routes
router.route('/addOperation').post(addOperation);
router.route('/updateOperation').post(updateOperation);
router.route('/getOperation').post(getOperation);
router.route('/removeOperation').post(removeOperation);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
});

// export router
module.exports = router;