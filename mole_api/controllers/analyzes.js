const connectDB = require('../config/db.js');
const User = require('../models/User.js');
const Analysis = require('../models/Analysis.js');
const mongoose = require('mongoose');

const remove = (obj)=>{Object.keys(obj).forEach(key => obj[key]?{}:delete obj[key]); return obj};
const unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN = ({_id, date, type, description, conclusion}) => ({"parent":_id, date, type, description, conclusion});
const unwrap = (obj)=>(remove(unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN(obj)));

exports.addAnalysis = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var analysis = await Analysis.create(unwrap(req.body));
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
        var analysis = await Analysis.updateOne({'_id':id}, unwrap(body));
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