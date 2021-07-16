const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const User = require('../models/User.js');
const Consultation = require('../models/Consultation.js');
const mongoose = require('mongoose');


exports.uploadPhoto = async (req, res, next) => {
    try{
        if (req.files || !Object.keys(req.files).length === 0){
            
            var img = req.files['img'].data;
            var consultationId = req.body.id;
            var encoded_image = img.toString('base64');

            var photo = await Photo.create({"data": encoded_image});
            var consultation = await C.updateOne(
                {"_id":consultationId},
                { $push:{"photos":photo.id}}
            );           
            res.status(201).json({
                success: true,
                id: photo.id
            })
        } else {
            res.status(400).json({"error":"attached file doesn't exist. no photo attached?"})
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
        if (req.body.id){
            let id = req.body.id;
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