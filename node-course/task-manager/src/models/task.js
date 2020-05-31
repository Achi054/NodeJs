var mongoose = require('mongoose');
var validate = require('validator');

var Tasks = new mongoose.model('tasks', {
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = Tasks;