const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.get('/me', getCurrentUserInfo);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);
