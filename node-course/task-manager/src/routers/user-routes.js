const expres = require('express');
const User = require('../models/user');
const multer = require('multer');
const sharp = require('sharp');
const authenticate = require('../middleware/authentication');

const router = new expres.Router();

var upload = multer({
	limits: 1000000,
	fileFilter(req, file, callBack) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)/))
			return callBack(new Error('Please upload a jpg, jpeg or png file.'));

		callBack(undefined, true);
	},
});

// User API(s)
router.post(
	'/users/me/avatar',
	authenticate,
	upload.single('avatar'),
	async (req, res) => {
		req.user.avatar = sharp(req.file.buffer).resize(250, 250).png().toBuffer();
		req.user.save();
		res.send();
	},
	(error, req, res, next) => res.status(400).send({ error: error.message })
);

router.delete('/users/me/avatar', authenticate, async (req, res) => {
	req.user.avatar = undefined;
	req.user.save();
	res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
	try {
		var user = await User.findById(req.params.id);

		if (!user || !user.avatar) throw new Error();

		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (error) {
		res.status(404).send();
	}
});

router.get('/users/me', authenticate, async (req, res) => {
	res.status(200).send(req.user);
});

router.post('/users/login', async (req, res) => {
	try {
		var user = await User.findByCredential(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.status(200).send({
			user,
			token,
		});
	} catch (error) {
		res.status(400).send({
			error: error.message,
		});
	}
});

router.post('/users/me/logout', authenticate, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token != req.token
		);
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
			error: error.message,
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
			error: error.message,
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
			user,
		});
	} catch (error) {
		res.status(400).send({
			error: error.message,
		});
	}
});

module.exports = router;
