const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');

//Setting Express.js
const app =  express();
app.use(express.json());

//Setting Mongoose connect to MongoDB
mongoose.connect(`mongodb+srv://Achi054:${process.env.MONGODB_ATLAS_PW}@data-store-oea25.azure.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to the Database..');
});

const Course = require('./models/course');

app.get('/', (req, res) => {
    res.send('Hello Sujith, Welcome to Node demo with Express and MongoDB');
});

app.get('/api/courses', (req, res) => {
    Course.find((err, courses) => {
        if(err) return res.send(err.message);
        res.send(courses);
    });
});

app.get('/api/courses/:id', (req, res) => {
    let course = Course.find({ courseId: parseInt(req.params.id) }, (err, course) => {
        if(err) return res.send(err.message);
        if(!course) res.status(404).send('course with name not found.');
        res.send(course);
    });
});

app.post('/api/courses', (req, res) => {
    let { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const course = new Course({
        _id: mongoose.Types.ObjectId(),
        courseId: parseInt(req.body.courseid),
        name: req.body.name
    });

    course.save().then(result => {
        res.send(result);
    })
    .catch(err => console.log(err));
});

app.put('/api/courses/:courseid', (req, res) => {
    Course.update({ courseId: req.params.courseid }, { $set: { name: req.body.name } });
});

app.delete('/api/course/:courseid', (req, res) => {
    Course.remove({ courseId: parseInt(req.params.courseid) }, (err) => {
        console.log(err);
        res.status(404).send(`Error: ${err}`);
    });
});

//Environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));

function validate(course)
{
    let schema = {
        name: Joi.string().min(3).required(),
        courseid: Joi.required()
    };
    return Joi.validate(course, schema);
}