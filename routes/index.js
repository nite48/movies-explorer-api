const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { createUserValidator, loginValidator } = require('../middlewares/celebrate');

router.post(
  '/signin',
  loginValidator,
  login,
);

router.post(
  '/signup',
  createUserValidator,
  createUser,
);

router.use(auth);
router.use('/users', userRouter); //
router.use('/movies', movieRouter); //

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
