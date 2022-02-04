const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'secret' } = process.env;

module.exports = (req, res, next) => {
  // console.info(req.headers.authorization);
  const tokenReplace = req.headers.authorization;
  const token = tokenReplace.replace('Bearer ', '');
  if (!token) {
    console.info(token);
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
