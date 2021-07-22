const mongoose = require('mongoose');
const internal = require('stream');
const ConsultationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Date.now
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
    plans: String,
    recommendations: String,
    diagnosis: String
})

module.exports = mongoose.model('Consultation', ConsultationSchema);