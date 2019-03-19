const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.Number,
    name: String
}); 

module.exports = mongoose.model('Course', courseSchema);