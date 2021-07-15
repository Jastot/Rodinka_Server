const connectDB = require('../config/db.js');
const User = require('../models/User.js');
//const Consultation = require('../models/Consultation.js');
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

exports.putConsultation = async(req, res, next) => {
    try{
        const consultation = "хачу тут файлик json формата, который бы передавался в массивчик консультаций и лежал бы там в виде объектика пж пж";
        console.log(consultation);

        const user = await User.updateOne({'_id': req.body['_id']}, consultation);
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch(error) {
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
        const user = await User.updateOne({'_id': req.body['_id']}, req.body);
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
exports.deleteUser = async(req, res, next) => {
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


// @decs    удаление пользователя 
// @rout    DELITE //api/users/:id
exports.deleteUser = async(req, res, next) => {
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