const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err'); // 401

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
