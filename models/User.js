const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided'],
        minLength: [5, 'Name cannot be less than 5 characters'],
        maxLength: [25, 'Name cannot exceed 25 characters'],
        trim: true,
    },

    email: {
        type: String,
        unique: [true, 'Email was used before'],
        required: [true, 'Email must be provided'],
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: 'Invalid Email',
        },
        maxLength: [50, 'Email cannot exceed 50 characters'],
    },

    password: {
        type: String,
        required: [true, 'Password must be provided'],
        maxLength: [50, 'Passowrd cannot exceed 50'],
        minLength: [10, 'Password cannot be shorter than 10'],
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
