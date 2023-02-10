const RegisterService = require('../Service/Register.service');
const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/GenerateJWT');

exports.createUserCollaction = async (req, res) => {
	try {
		const user = await RegisterService.createUserService(req.body);
		res.status(200).json({
			status: 'Success',
			message: 'User create Successfully.',
			user,
		});
	} catch (error) {
		res.status(200).json({
			status: 'Failed',
			message: 'Data get not successfully.',
		});
	}
};

exports.logInUserCollaction = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await RegisterService.logInUserService(req.body);

		// If user is not exzist, then show a error message.
		if (!user) {
			return res.status(401).json({
				status: 'Fail',
				message: 'User not found. Please create a user.',
			});
		}

		// check password is correct.
		const isPasswordCorrect = bcrypt.compareSync(password, user.password);

		// If password is not correct, then show a error message
		if (!isPasswordCorrect) {
			return res.status(403).json({
				status: 'Fail',
				message: 'Password is not correct.',
			});
		}

		// check user is active. If not active show a error message.
		if (user.status === 'inActive') {
			return res.status(401).json({
				status: 'Fail',
				message: 'Your account is not active yet.',
			});
		}

		// generate a token
		const token = generateToken(user);

		// send user and token
		res.status(200).json({
			status: 'Success',
			message: 'User Logins Successfully.',
			user,
			token,
		});
	} catch (error) {
		res.status(200).json({
			status: 'Failed',
			message: 'Data get not successfully.',
		});
	}
};
