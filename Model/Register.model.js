const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerScema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: [2, 'Name shout be at least 5 letter.'],
			maxLength: [100, 'Name is too large.'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: [true, 'Email shout be unique.'],
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'inActive'],
			default: 'active',
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

registerScema.pre('save', function (next) {
	const password = this.password;

	const hashPassword = bcrypt.hashSync(password, 10);
	this.password = hashPassword;
	next();
});

const REGISER_MODEL = mongoose.model('User', registerScema);
module.exports = REGISER_MODEL;
