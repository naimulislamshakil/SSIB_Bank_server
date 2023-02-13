const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(' ')?.[1];

		// If there have not any token show a error message
		if (!token) {
			return res.status(401).json({
				status: 'Failed',
				error: 'Pleace LogIn Again.',
			});
		}

		// Decode the token
		const decode = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN);
		req.user = decode;
		next();
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error: error.message,
		});
	}
};
