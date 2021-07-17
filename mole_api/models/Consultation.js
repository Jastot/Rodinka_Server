const mongoose = require('mongoose');
const internal = require('stream');
const ConsultationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Math.floor(Date.now()/1000)
    },
    photos: [
        new mongoose.Schema({
            id: String,
            minimapNum: Number
        }, {_id:false})
    ],
    parent: String,
    complaints: String,
    examination: String,
    planned: String,
    recommendations: String,
    diagnosis: String
})

module.exports = mongoose.model('Consultation', ConsultationSchema);