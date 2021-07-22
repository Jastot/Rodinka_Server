const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Diagnosis = require('../models/Diagnosis.js');
const mongoose = require('mongoose');

const remove = (obj)=>{Object.keys(obj).forEach(key => obj[key]?{}:delete obj[key]); return obj};
const unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN = ({_id, date, diagnosis, diagnosisTLDR, TNMStage}) => ({"parent":_id, date, diagnosis, diagnosisTLDR, TNMStage});
const unwrap = (obj)=>(remove(unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN(obj)));

exports.addDiagnosis = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var unwrapped = unwrap(req.body);
        var diagnosis = await Diagnosis.create(unwrapped);
        if (unwrapped.diagnosisTLDR){
            await User.updateOne({'_id':id}, {$push:{'diagnoses':{"id":diagnosis['_id'], "date":diagnosis['date'], "diagnosisTLDR":unwrapped.diagnosisTLDR}}});
        } else {
            await User.updateOne({'_id':id}, {$push:{'diagnoses':{"id":diagnosis['_id'], "date":diagnosis['date']}}});
        }
        res.status(200).json({
            "success": true,
            "diagnosisId":diagnosis['_id'],
            "timestamp":diagnosis['date']
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.updateDiagnosis = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var unwrapped = unwrap(req.body);
        var diagnosis = await Diagnosis.updateOne({'_id':id}, unwrapped);
        if (unwrapped['diagnosisTLDR']){
            var parentId = await Diagnosis.findOne({'_id':id}, {"parent":1});
            await User.updateOne({'_id':parentId.parent, 'diagnoses.id':id}, {"$set": {"diagnoses.$.diagnosisTLDR":unwrapped.diagnosisTLDR}});
        }
        res.status(200).json({
            "success": true,
            "diagnosis":diagnosis
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.getDiagnosis = async (req,res,next)=>{
    try{
        var id = req.body['_id'];
        var diagnosis = await Diagnosis.findOne({'_id':id});
        res.status(200).json({
            "success":true,
            "diagnosis":diagnosis
        })
    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.removeDiagnosis = async (req,res,next)=>{
    try {
        var diagnosisId = req.body['_id'];
        var diagnosis = await Operation.findOne({"_id":diagnosisId}, {"parent":1});
        await Diagnosis.deleteOne({"_id":diagnosisId});
        var user = await User.updateOne({"_id":diagnosis.parent}, {$pull:{"operations":{"id":diagnosisId}}});
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