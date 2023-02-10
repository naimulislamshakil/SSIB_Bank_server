const router = require('express').Router();
const RegisterCollaction = require('../../Collaction/Register.collaction');

router.route('/').post(RegisterCollaction.createUserCollaction);
router.route('/login').post(RegisterCollaction.logInUserCollaction);

module.exports = router;
