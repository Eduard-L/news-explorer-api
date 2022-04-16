const { User } = require('../utils/constants');
const { NotFoundError, BadRequestError } = require('../utils/ErrorHandler');

const getUserInfo = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (user === null) {
      next(new NotFoundError('user has not been founded'));
      return;
    }
    if (user) {
      res.status(200).send(user);
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('your data is invalid'));
      return;
    }
    next(e);
  }
};

module.exports = { getUserInfo };
