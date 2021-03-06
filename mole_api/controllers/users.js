const connectDB = require('../config/db.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

// @decs     получение людей по категориям [userType: client, admin, doctor]
// @route    GET//api/users/people
exports.getPeople = async(req, res, next) => {
    try {
        if (req.body['userType']){
            const clients = await User.find({'userType': req.query['userType']});
            res.status(200).json({
                success: true, 
                data: clients,
            });
        } else {
            throw 'No userType specified';
        }

    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error: error.toString(),
        });
    }
};

// @decs    получение всех пользователей 
// @route    GET//api/users
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
            error: error.toString(),
        });
    }
};

// @decs    получение пользователя 
// @route    GET//api/users/user
exports.getUser = async(req, res, next) => {
    try {
        var user = await User.findOne({'_id': req.query['_id']});
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error: error.toString(),
        });
    }
};

// @decs     добавление пользователя 
// @route    POST//api/users/user
exports.postUser = async(req, res, next) => {
    try {
        let userUnwrap = ({_id, name, surname, additional_name, dateOfBirth, userType, email, password}) => ({_id, name, surname, additional_name, dateOfBirth, userType, email, password});
        console.log(req.body);
        const entryTest = await User.findOne({"email":req.email});
        if (entryTest != null){
            const user = await User.create(userUnwrap(req.body));
            res.status(201).json({
                success: true, 
                data: user,
            });
        } else {
            res.status(400).json({
                success:false,
                "error":"this email is already in use"
            })
        }

    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error: error.toString(),
        });
    }
};

// @decs    изменение пользователя 
// @route    PUT//api/users/user
exports.putUser = async(req, res, next) => {
    try {
        let userUnwrap = ({_id, name, surname, additional_name, dateOfBirth, userType, email, password}) => ({_id, name, surname, additional_name, dateOfBirth, userType, email, password});
        const user = await User.updateOne({'_id': req.body['_id']}, userUnwrap(req.body)); //finfoneandupdate
        res.status(200).json({
            success: true, 
            data: user,
        });
    }
    catch (error){
        res.status(404).json({
            success: false, 
            error: error.toString(),
        });
    }
};

// @decs     удаление пользователя 
// @route    DELETE //api/users/user
exports.deleteUser = async(req, res, next) => {
    try {
        const deleteUser = await User.deleteOne({'_id': req.body['_id']});
        res.status(200).json({
            success: true, 
            data: deleteUser,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false, 
            error: error.toString(),
        });
    }
};

// @decs    добавление консультации пользователю 
// @route   PUT//api/users/user/photo
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
            error: error.toString(),
        });
    }
};