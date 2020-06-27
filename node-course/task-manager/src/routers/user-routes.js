const expres = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/authentication');

const router = new expres.Router();

// User API(s)
router.get('/users/me', authenticate, async (req, res) => {
    res.status(200).send(req.user);
});

router.post('/users/login', async (req, res) => {
    try {
        var user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.post('/users/me/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
        req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/me/logoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = [];
        req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/users/me', authenticate, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

router.patch('/users/me', authenticate, async (req, res) => {
    var updatingProperty = Object.keys(req.body);
    var updatableProperty = ['age', 'name', 'email', 'password'];
    var isUpdatePossible = updatingProperty.every((property) =>
        updatableProperty.includes(property)
    );

    if (!isUpdatePossible)
        return res.status(400).send({
            error: 'Invalid update!',
        });

    try {
        updatingProperty.forEach((update) => (req.user[update] = req.body[update]));
        req.user.save();

        if (!user) return res.status(404).send();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.post('/users', async (req, res) => {
    var user = new User(req.body);

    try {
        await user.save();
        var token = await user.generateAuthToken();
        res.status(201).send({
            token,
            user
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

module.exports = router;