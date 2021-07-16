// router with express connection
const express = require('express');
const {
   addConsultation, removeConsultation, updateConsultation
    } = require('../controllers/consultations.js');
const router = express.Router();

// routes
router.route('/addConsultation').post(addConsultation);
router.route('/updateConsultation').post(updateConsultation);
router.route('/removeConsultation').post(removeConsultation);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
});

// export router
module.exports = router;