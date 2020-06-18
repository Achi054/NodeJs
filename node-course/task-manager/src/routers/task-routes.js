const express = require('express');
const Task = require('../models/task.js');
const authenticate = require('../middleware/authentication');
const router = new express.Router();

// Task API(s)
router.delete('/tasks/:id', async (req, res) => {
    try {
        var task = Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task)
            return res.status(404).send();

        task.remove();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', authenticate, async (req, res) => {
    var updatingProperties = Object.keys(req.body);
    var updatableProperties = ['description', 'conpleted'];
    var isUpdatePossible = updatableProperties.every((property) => updatableProperties.includes(property));

    if (!isUpdatePossible)
        return res.status(400).send();

    try {
        var task = Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        updatingProperties.forEach((update) => task[update] = req.body[update]);
        task.save();

        if (!task)
            return res.status(404).send();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/tasks', authenticate, async (req, res) => {
    var task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', authenticate, async (req, res) => {
    try {
        var tasks = await Task.find({
            owner: req.user._id
        });
        if (!tasks)
            return res.status(404).send('No tasks available.');
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', authenticate, async (req, res) => {
    var _id = req.params.id;

    try {
        var task = Task.findOne({
            _id,
            owner: req.user._id
        });
        if (!task)
            return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;