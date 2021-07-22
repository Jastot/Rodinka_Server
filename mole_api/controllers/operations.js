const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Operation = require('../models/Operation.js');
const mongoose = require('mongoose');

const remove = (obj)=>{Object.keys(obj).forEach(key => obj[key]?{}:delete obj[key]); return obj};
const unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN = ({_id, date, description, descriptionTLDR, diagnosis, recommendations}) => ({"parent":_id, date, description, descriptionTLDR, diagnosis, recommendations});
const unwrap = (obj)=>(remove(unwrap1_professional_naming_vArIaBlE_BeSt2007IloVEMORGENSHTERN(obj)));

exports.addOperation = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var unwrapped = unwrap(req.body);
        var operation = await Operation.create(unwrapped);
        if (unwrapped['descriptionTLDR']){
            await User.updateOne({'_id':id}, {$push:{'operations':{"id":operation['_id'], "date":operation['date']}}});
        } else {
            await User.updateOne({'_id':id}, {$push:{'operations':{"id":operation['_id'], "date":operation['date'], "descriptionTLDR":unwrapped.descriptionTLDR}}});
        }
        res.status(200).json({
            "success": true,
            "operationId":operation['_id'],
            "timestamp":operation['date']
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.updateOperation = async (req,res,next)=>{
    try {
        var id = req.body['_id'];
        var body = req.body;
        delete body['_id'];
        var operation = await Operation.updateOne({'_id':id}, unwrap(req.body));
        if (req.body['descriptionTLDR']){
            console.log('in')
            var parentId = await Operation.findOne({'_id':id}, {"parent":1});
            await User.updateOne({'_id':parentId.parent, 'operations.id':id}, {"$set": {"operations.$.descriptionTLDR":req.body['descriptionTLDR']}});
        }
        res.status(200).json({
            "success": true,
            "operation":operation
        });

    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.getOperation = async (req,res,next)=>{
    try{
        var id = req.body['_id'];
        var operation = await Operation.findOne({'_id':id});
        res.status(200).json({
            "success":true,
            "operation":operation
        })
    } catch (err){
        res.status(400).json({
            "success": false,
            "error": err.toString()
        })
    }
}
exports.removeOperation = async (req,res,next)=>{
    try {
        var operationId = req.body['_id'];
        var operation = await Operation.findOne({"_id":operationId}, {"parent":1});
        await Operation.deleteOne({"_id":operationId});
        var user = await User.updateOne({"_id":operation.parent}, {$pull:{"operations":{"id":operationId}}});
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