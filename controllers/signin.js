const jwt = require('jsonwebtoken');
const { BadRequestError, Unauthorized } = require('../utils/ErrorHandler');
const { User, JWT_SECRET, NODE_ENV } = require('../utils/constants');

const signIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!password || !email) {
      next(new BadRequestError('provide Email or Password'));
      return;
    }

    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: 3600 });
      res.status(200).send(token);
    } else {
      next(new Unauthorized('your password or email are wrong'));
    }
  } catch (e) {
    next(new Unauthorized('your password or email are wrong'));
  }
};
module.exports = { signIn };
