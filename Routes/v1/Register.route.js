const router = require('express').Router();
const RegisterCollaction = require('../../Collaction/Register.collaction');
const { verifyToken } = require('../../Maddleware/verifyToken');

router.route('/').post(RegisterCollaction.createUserCollaction);
router.route('/login').post(RegisterCollaction.logInUserCollaction);
router
	.route('/user_persistence')
	.get(verifyToken, RegisterCollaction.userPersistence);

module.exports = router;
