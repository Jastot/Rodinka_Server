const connectDB = require('../config/db.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

// @decs    получение всех пользователей 
// @rout    GET//api/users
exports.getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true, 
            data: users,
        });
    }
    catch (error){
        res.status(404).json({
            success: false, 
            error,
        });
    }
};

// @decs    получение пользователя 
// @rout    GET//api/users/:id
exports.getUser = async(req, res, next) => {
    try {
        const user = await User.findOne({'_id': req.body['_id']});
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error,
        });
    }
};


// @decs    получение людей по категориям [userType: client, admin, doctor]
// @rout    GET//api/users/people
exports.getPeople = async(req, res, next) => {
    try {
        const clients = await User.find({'userType': req.body['userType']});
        res.status(200).json({
            success: true, 
            data: clients,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error,
        });
    }
};


// @decs    добавление пользователя 
// @rout    POST//api/users/:id
exports.postUser = async(req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(201).json({
            success: true, 
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error,
        });
    }
};

// @decs    изменение пользователя 
// @rout    PUT//api/users/:id
exports.putUser = async(req, res, next) => {
    try {
        const user = await User.updateOne({'_id': req.body['_id']}, req.body); //finfoneandupdate
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch (error){
        res.status(404).json({
            success: false, 
            error,
        });
    }
};

// @decs    добавление консультации пользователю 
// @rout    PUT//api/users/id/photo
exports.putConsultations = async(req, res, next) => {
    try {
        const user = await User.updateOne({'_id': req.body['_id']}, req.body); //finfoneandupdate
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch (error){
        res.status(404).json({
            success: false, 
            error,
        });
    }
};

// @decs    удаление пользователя 
// @rout    DELITE //api/users/:id

exports.deliteUser = async(req, res, next) => {
    try {
        const deliteUser = await User.deleteOne({'_id': req.body['_id']});
        res.status(200).json({
            success: true, 
            data: deliteUser,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error,
        });
    }
};