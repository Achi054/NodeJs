var mongoose = require('mongoose');
var validate = require('validator');

var User = new mongoose.model('users', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [7, 'Password length should be more than 7 characters.'],
        validate(value){
            if(validate.contains(value.toLowerCase(), 'password'))
                throw new Error('Password not strong enough.')
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validate.isEmail(value))
                throw new Error('Invalid email.');
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0)
                throw new Error('Age should be a positive number.');
        }
    }
});

module.exports = User;