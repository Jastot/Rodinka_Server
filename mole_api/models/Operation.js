const mongoose = require('mongoose');
const internal = require('stream');
const OperationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Number,
        default: Date.now
    },
    parent: String,
    descriptionTLDR: String,
    description: String,
    diagnosis: String,
    recommendations: String
});

module.exports = mongoose.model('Operation', OperationSchema);