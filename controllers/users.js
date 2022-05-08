const { User, DATA_INVALID_MESSAGE, NOT_FOUND_MESSAGE } = require('../utils/constants');
const { NotFoundError, BadRequestError } = require('../utils/ErrorHandler');

const getUserInfo = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (user === null) {
      next(new NotFoundError(`${NOT_FOUND_MESSAGE}`));
      return;
    }
    if (user) {
      res.status(200).send(user);
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError(`${DATA_INVALID_MESSAGE}`));
      return;
    }
    next(e);
  }
};

module.exports = { getUserInfo };
