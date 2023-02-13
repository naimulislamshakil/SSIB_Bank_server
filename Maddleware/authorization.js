exports.authorization = (...role) => {
	return (req, res, next) => {
		const userRole = req.user.role;

		// check userRole is includes. If userRole is not includes role, then show a error message.
		if (!role.includes(userRole)) {
			return res.status(403).json({
				status: 'Failed',
				message: 'You are not authorize in this route.',
			});
		}

		// If include call next function
		next();
	};
};
