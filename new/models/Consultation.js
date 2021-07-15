const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    "date": {
        type: Date,
        default: Date.now,
    },
    "photos": [],
    "text": "text",
});

module.exports = mongoose.model('Consultation', ConsultationSchema);