const expres = require('express');
const User = require('../models/user');
const auth = require('../middleware/authentication');

const router = new expres.Router();

// User API(s)
router.post('/users/login', async (req, res) => {
    try {
        var user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        var user = User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).send();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', async (req, res) => {
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
        var id = req.params.id;
        var user = User.findById(id);
        updatingProperty.forEach((update) => (user[update] = req.body[update]));
        user.save();

        if (!user) return res.status(404).send();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(e);
    }
});

router.post('/users', async (req, res) => {
    var user = new User(req.body);

    try {
        await user.save();
        var token = await user.generateAuthToken();
        res.send({
            token,
            user
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user);
});

router.get('/users/:id', async (req, res) => {
    var id = req.params.id;

    try {
        var user = await User.findById(id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;