const { ConflictError, BadRequestError } = require('../utils/ErrorHandler');
const {
  SALT, User, bcrypt, DATA_INVALID_MESSAGE, CONFLICT_ERROR_MESSAGE,
} = require('../utils/constants');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const isUserExcist = await User.findOne({ email });
    if (isUserExcist) {
      next(new ConflictError(`${CONFLICT_ERROR_MESSAGE}`));
      return;
    }
    const hashPass = await bcrypt.hash(password, SALT);
    if (hashPass) {
      const newUser = await User.create({ name, email, password: hashPass });
      if (newUser) {
        res.status(201).send({ name, email });
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(`${DATA_INVALID_MESSAGE}`));
      return;
    }
    next(e);
  }
};

module.exports = { signUp };
