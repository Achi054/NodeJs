var mongoose = require('mongoose');
var validate = require('validator');
var bcrypt = require('bcryptjs');

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
});

userSchema.pre('save', async function (next) {
	var user = this;

	if (user.isModified('password'))
		user.password = await bcrypt.hash(user.password, 8);

	next();
});

var User = new mongoose.model('users', userSchema);

module.exports = User;
