const jwt = require('jsonwebtoken');
const { BadRequestError, Unauthorized } = require('../utils/ErrorHandler');
const {
  User, JWT_SECRET, NODE_ENV, DATA_INVALID_MESSAGE, WRONG_LOGIN_MESSAGE,
} = require('../utils/constants');

const signIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!password || !email) {
      next(new BadRequestError(`${DATA_INVALID_MESSAGE}`));
      return;
    }

    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: 3600 });
      res.status(200).send(token);
    } else {
      next(new Unauthorized(`${WRONG_LOGIN_MESSAGE}`));
      return;
    }
  } catch (e) {
    next(new Unauthorized(`${WRONG_LOGIN_MESSAGE}`));
  }
};
module.exports = { signIn };
