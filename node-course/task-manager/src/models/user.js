var mongoose = require('mongoose');
var validate = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		require: true,
		trim: true,
		minlength: [7, 'Password length should be more than 7 characters.'],
		validate(value) {
			if (validate.contains(value.toLowerCase(), 'password'))
				throw new Error('Password not strong enough.');
		},
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
		validate(value) {
			if (!validate.isEmail(value)) throw new Error('Invalid email.');
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) throw new Error('Age should be a positive number.');
		},
	},
	tokens: [{
		token: {
			type: String,
			require: true,
		},
	}, ],
});

userSchema.methods.generateAuthToken = async function () {
	var user = this;
	var token = jwt.sign({
		_id: user._id.toString()
	}, 'thisismynodeapp');
	user.tokens = user.tokens.concat({
		token
	});
	await user.save();

	return token;
};

userSchema.statics.findByCredential = async (email, password) => {
	var user = await User.findOne({
		email,
	});

	if (!user) throw new Error('Unable to login');

	var isMatch = await bcrypt.compare(user.password, password);

	if (!isMatch) throw new Error('Unable to login');

	return user;
};

userSchema.pre('save', async function (next) {
	var user = this;

	if (user.isModified('password'))
		user.password = await bcrypt.hash(user.password, 8);

	next();
});

var User = new mongoose.model('users', userSchema);

module.exports = User;