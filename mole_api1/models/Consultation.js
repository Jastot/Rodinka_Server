const { kStringMaxLength } = require('buffer');
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
        {
            id: String,
            number: Number
        }
    ],
    complaints: String,
    examination: String,
    planned: String,
    recommendations: String,
    diagnosis: String
})

module.exports = mongoose.model('Consultation', ConsultationSchema);