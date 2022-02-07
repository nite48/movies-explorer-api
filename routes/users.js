const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/celebrate');

router.get('/me', getUser);
router.patch(
  '/me',
  updateUserValidator,
  updateUser,
);

module.exports = router;
