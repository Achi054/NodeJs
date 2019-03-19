const Joi = require('joi');
const express = require('express');
const app =  express();
app.use(express.json());

const courses = [
    { id: 1, name: 'Physics' },    
    { id: 2, name: 'Chemistry' },
    { id: 3, name: 'Maths' }
];

app.get('/', (req, res) => {
    res.send('Hello Sujith, Welcome to Node demo');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(x => x.id === parseInt(req.params.id));
    if(!course) res.status(404).send('course with id not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    let { error } = validate(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
    }

    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(x => x.id === parseInt(req.params.id));
    if(!course) res.status(404).send('course with id not found.');

    let { error } = validate(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

//Environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));

function validate(course)
{
    let schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}