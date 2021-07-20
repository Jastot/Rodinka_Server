const mongoose = require('mongoose');
const internal = require('stream');
const OperationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Math.floor(Date.now()/1000)
    },
    parent: String,
    descriptionTLDR: String,
    description: String,
    diagnosis: String,
    recommendations: String
});

module.exports = mongoose.model('Operation', OperationSchema);