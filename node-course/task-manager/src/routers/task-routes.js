const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();

// Task API(s)
router.delete('/tasks/:id', async (req, res) => {
    try {
        var task = Task.findByIdAndDelete(req.params.id);

        if (!task)
            return res.status(404).send();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    var updatingProperties = Object.keys(req.body);
    var updatableProperties = ['description', 'conpleted'];
    var isUpdatePossible = updatableProperties.every((property) => updatableProperties.includes(property));

    if (!isUpdatePossible)
        return res.status(400).send();

    try {
        var task = Task.findById(req.params.id);
        updatingProperties.forEach((update) => task[update] = req.body[update]);
        task.save();

        if (!task)
            return res.status(404).send();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/tasks', async (req, res) => {
    var task = new Task(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        var task = await Task.find();
        if (!tasks)
            return res.status(404).send('No tasks available.');
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req, res) => {
    var id = req.params.id;

    try {
        var task = Task.findById(id);
        if (!task)
            return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;