const connectDB = require('../config/db.js');
const Photo = require('../models/Photo.js');
const mongoose = require('mongoose');

exports.uploadPhoto = async (req, res, next) => {
    try{
        if (req.files || !Object.keys(req.files).length === 0){
            
            var img = req.files[Object.keys(req.files)[0]].data;
            var encoded_image = img.toString('base64');
            const photo = await Photo.create({"data": encoded_image});
            delete photo["data"];
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