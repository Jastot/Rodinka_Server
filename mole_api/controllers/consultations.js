const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Consultation = require('../models/Consultation.js');
const mongoose = require('mongoose');

const remove = (obj)=>{Object.keys(obj).forEach(key => obj[key]?{}:delete obj[key]); return obj};
const unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN = ({_id, date, complaints, examination, plans, recommendations, diagnosis}) => ({"parent":_id, date, complaints, examination, plans, recommendations, diagnosis});
const unwrap = (obj)=>(remove(unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN(obj)));

exports.addConsultation = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var consultation = await Consultation.create(unwrap(req.body));
        await User.updateOne({'_id':id}, {$push:{'consultations':{"id":consultation['_id'], "date":consultation['date']}}});
        res.status(200).json({
            "success": true,
            "consultationId":consultation['_id'],
            "timestamp":consultation['date']
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.updateConsultation = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var consultation = await Consultation.updateOne({'_id':id}, unwrap(req.body));
        res.status(200).json({
            "success": true,
            "consultation":consultation
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.getConsultation = async (req,res,next)=>{
    try{
        var id = req.body['_id'];
        var consultation = await Consultation.findOne({'_id':id});
        res.status(200).json({
            "success":true,
            "consultation":consultation
        })
    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.removeConsultation = async (req,res,next)=>{
    try {
        var consultationId = req.body['_id'];
        var consultation = await Consultation.findOne({"_id":consultationId}, {"parent":1});
        await Consultation.deleteOne({"_id":consultationId});
        var user = await User.updateOne({"_id":consultation.parent}, {$pull:{"consultations":{"id":consultationId}}});
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