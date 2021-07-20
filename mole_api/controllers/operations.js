const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Operation = require('../models/Operation.js');
const mongoose = require('mongoose');

exports.addOperation = async (req,res,next)=>{
    try {
        let unwrap = ({_id, date, type, description, conclusion}) => ({"parent":_id, date, type, description, conclusion});
        var id = req.body['_id'];
        var operation = await Operation.create(unwrap(req.body));
        await User.updateOne({'_id':id}, {$push:{'operations':{"id":operation['_id'], "date":operation['date']}}});
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
        let unwrap = ({date, type, description, conclusion}) => ({date, type, description, conclusion});
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