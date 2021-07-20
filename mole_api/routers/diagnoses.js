// router with express connection
const express = require('express');
const { addDiagnosis, updateDiagnosis, getDiagnosis, removeDiagnosis } = require('../controllers/diagnoses.js');
const router = express.Router();

// routes
router.route('/addDiagnosis').post(addDiagnosis);
router.route('/updateDiagnosis').post(updateDiagnosis);
router.route('/getDiagnosis').post(getDiagnosis);
router.route('/removeDiagnosis').post(removeDiagnosis);

// no entry route
router.use('/', (req,res)=>{
    res.status(403).json({"error":"forbidden"});
});

// export router
module.exports = router;