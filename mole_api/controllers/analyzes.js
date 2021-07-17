const connectDB = require('../config/db.js');
const User = require('../models/User.js');
const Analysis = require('../models/analysis.js');
const mongoose = require('mongoose');

exports.addAnalysis = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var analysis = await Analysis.create({"parent":id});
        await User.updateOne({'_id':id}, {$push:{'analyzes':{"id":analysis['_id'], "date":analysis['date']}}});
        res.status(200).json({
            "success": true,
            "analysisId":analysis['_id'],
            "timestamp":analysis['date']
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.updateAnalysis = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var body = req.body;
        delete body['_id'];
        var analysis = await Analysis.updateOne({'_id':id}, body);
        res.status(200).json({
            "success": true,
            "analysis":analysis
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.getAnalysis = async (req,res,next)=>{
    try{
        var id = req.body['_id'];
        var analysis = await Analysis.findOne({'_id':id});
        res.status(200).json({
            "success":true,
            "analysis":analysis
        })
    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.removeAnalysis = async (req,res,next)=>{
    try {
        var analysisId = req.body['_id'];
        var analysis = await Analysis.findOne({"_id":analysisId}, {"parent":1});
        await analysis.deleteOne({"_id":analysisId});
        var user = await User.updateOne({"_id":analysis.parent}, {$pull:{"analyzes":{"id":analysisId}}});
        res.status(200).json({
            "success": true,
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}