var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

var Task = new mongoose.model('Task', taskSchema);

module.exports = Task;