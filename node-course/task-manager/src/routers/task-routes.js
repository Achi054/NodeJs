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
        res.status(500).send({
            error: error.message
        });
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
        res.status(400).send({
            error: error.message
        });
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
        res.status(400).send({
            error: error.message
        });
    }
});

// get tasks based on completed=true/false
// get tasks based on limit & skip
// get taks sorted with asc/desc on a property, format ?sort=createdon:asc
router.get('/tasks', authenticate, async (req, res) => {
    var match = {};
    var sort = {};

    if (req.query.completed)
        match.completed = req.query.completed === 'true';

    var sortingParams = req.query.sort.split(':');
    sortBy[sortingParams[0]] = sortingParams[1] === 'desc' ? -1 : 1;

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

module.exports = router;