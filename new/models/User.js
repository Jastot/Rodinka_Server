const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});


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
        trim: true, //delite probels,
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
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email не валиден',
        ],
      },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        validate: {
          validator: (data) => {
            if (data.length >= 6) {
              return true;
            } else {
              return false;
            }
          },
          message: 'Password must be at least 6 characters',
        },
    },
    consultations:[{
      "date": {
        type: Date,
        default: Date.now,
      },
      "photos": [],
      "text": "text",
    }],
});

UserSchema.pre('save', async function (next) {
    // Если пароль был изменен - шифруем
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  
  // Срабатывает при вызове findOneAndUpdate
UserSchema.pre('findOneAndUpdate', async function (next) {
    // Если пароль был изменен - шифруем
    if (!this._update.password) {
        return next();
}
  
    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
});
  
  // Генерирует JWT
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
  
  // Сравнивает введенных пароль к хешем
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);