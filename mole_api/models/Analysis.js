const mongoose = require('mongoose');
const internal = require('stream');
const AnalysisSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Date.now
    },
    parent: String,
    type: String,
    description: String,
    conclusion: String,
    attachments:[]
})

module.exports = mongoose.model('Analysis', AnalysisSchema);