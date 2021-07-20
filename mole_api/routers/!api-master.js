// .../api/ MASTER ROUTER

// router with express connection
const express = require('express');
const router = express.Router();

// connect routers
const usersRouter = require('./users');
const photoRouter = require('./photo');
const consultationsRouter = require('./consultations');
const operationsRouter = require('./operations');
const analyzesRouter = require('./analyzes');
const authRouter = require('./auth');
const diagnosesRouter = require('./diagnoses');
// use routers
router.use('/users', usersRouter);
router.use('/photos', photoRouter);
router.use('/consultations', consultationsRouter);
router.use('/operations', operationsRouter);
router.use('/analyzes', analyzesRouter);
router.use('/diagnoses', diagnosesRouter);
router.use('/auth', authRouter);

// no entry route
// router.use('/', (req,res)=>{
//     res.status(403).json({"error":"forbidden"});
// });

// export router
module.exports = router;