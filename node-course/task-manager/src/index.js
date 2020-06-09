const express = require('express');
require('./db/mongoose.js');

const User = require('./models/user.js');
const Task = require('./models/task.js');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.listen(port, () => console.log(`Server started in port ${port}`));

// User API(s)
app.post('/users', (req, res) => {
    var user = new User(req.body);

    user.save()
    .then(() => { res.send(user); })
    .catch((error) => { res.status(400).send(error); })
});

app.get('/users', (req, res) => {
    User.find()
    .then((users) => {
        if(!users)
            return res.status(404).send('User not found');
        
        res.send(users);
    })
    .catch((error) => res.status(500).send(error));
});

app.get('/users/:id', (req, res) => {
    var id = req.params.id;

    User.findById(id)
    .then((user) => {
        if(!user)
            return res.status(404).send('User not found');
        
        res.send(user);
    })
    .catch((error) => res.status(500).send(error));
});

// Task API(s)
app.post('/tasks', (req, res) => {
    var task = new Task(req.body);

    task.save()
    .then(() => res.send(task))
    .catch((error) => res.status(400).send(error));
});

app.get('/tasks', (req, res) => {
    Task.find()
    .then((tasks) => {
        if(!tasks)
            return res.status(404).send('No tasks available.');
        
        res.send(tasks);
    })
    .catch((error) => res.status(500).send(error));
});

app.get('/tasks/:id', (req, res) => {
    var id = req.params.id;

    Task.findById(id)
    .then((task) => {
        if(!task)
            return res.status(404).send('Task not found');
        
        res.send(task);
    })
    .catch((error) => res.status(500).send(error));
});

