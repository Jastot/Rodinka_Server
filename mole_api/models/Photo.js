const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    data: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Photo', photoSchema);