const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/ErrorHandler');
const { JWT_SECRET, NODE_ENV, UNAUTHORIZED_MESSAGE, SECRET_KEY_DEV_MODE } = require('../utils/constants');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new Unauthorized(`${UNAUTHORIZED_MESSAGE}`));
      return;
    }
    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV_MODE);
    if (payload) {
      req.user = payload;
    } else {
      next(new Unauthorized(`${UNAUTHORIZED_MESSAGE}`));
      return;
    }
  } catch (e) {
    next(e);
  }
  next();
};

module.exports = { auth };
