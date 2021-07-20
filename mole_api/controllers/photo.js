const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Consultation = require('../models/Consultation.js');
const mongoose = require('mongoose');


exports.uploadPhoto = async (req, res, next) => {
    try{
        if (req.files || !Object.keys(req.files).length === 0 && req.body.id && re){
            
            var img = req.files['img'].data;
            var consultationId = req.body['_id'];
            var encoded_image = img.toString('base64');

            var photo = await Photo.create({"data": encoded_image});
            var consultation = await Consultation.updateOne(
                {"_id":consultationId},
                { $push:{"photos":{"id":photo['_id']}}}
            );           
            res.status(201).json({
                success: true,
                id: photo.id
            })
        } else {
            res.status(400).json({"error":"no attached files exist. no photo attached?"})
        }

    } catch(err) {
        res.status(500).json({
            "success": false, 
            "error": err.toString()
        })
    }
}

exports.getPhoto = async (req, res, next) => {
    try {
        if (req.body['_id']){
            let id = req.body['_id'];
            let photo = await Photo.findOne({"_id":id});
            res.status(200).json({"data":photo.data});
        } else {
            res.status(400).json({"error":"no field named id. no id sent?"})
        }

    } catch(err){
        res.status(500).json({
            "success": false, 
            "error": err.toString()
        })
    }
}