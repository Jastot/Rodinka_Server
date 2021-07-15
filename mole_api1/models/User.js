const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    surname: {
        type: String,
        // : true,
        required: [true, "Surname is required"],
        trin: true, //delite probels,
        maxlength: [100, "Max length is 100 characters"],
    },
    name: {
        type: String,
        require: [true, "Name is required"],
        trin: true, //delite probels,
        maxlength: [100, "Max length is 100 characters"],
    },
    additional_name: {
        type: String,
        require: false,
        trin: true, //delite probels,
        maxlength: [100, "Max length is 100 characters"],
    },
    dateOfBirth: {
        type: Date,
        require: [true, 'Date of Birth is required']
    },
    userType: {
        type: String, 
        enum: ['client', 'doctor', 'admin'],
        default: 'client',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    consultation: [
        {
            date: String,
            diagnosis:String,
            comments:String,
            photos: [],
        }
    ],

    
});

module.exports = mongoose.model('User', UserSchema);