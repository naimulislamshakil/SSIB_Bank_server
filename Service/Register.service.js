const REGISER_MODEL = require('../Model/Register.model');

exports.createUserService = async (data) => {
	const user = await REGISER_MODEL.create(data);
	return user;
};

exports.logInUserService = async (data) => {
	const { email } = data;
	const user = await REGISER_MODEL.findOne({ email });
	return user;
};
