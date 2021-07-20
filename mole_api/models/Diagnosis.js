const mongoose = require('mongoose');
const internal = require('stream');
const DiagnosisSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Math.floor(Date.now()/1000)
    },
    parent: String,
    diagnosis: String,
    diagnosisTLDR: String,
    TNMStage: String,
    analyzes: [new mongoose.Schema({
        id:String,
        date: Number
    }, {_id: false})
    ]
})

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);