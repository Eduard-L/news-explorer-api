const { ConflictError, BadRequestError } = require('../utils/ErrorHandler');
const { SALT, User, bcrypt } = require('../utils/constants');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const isUserExcist = await User.findOne({ email });
    if (isUserExcist) {
      next(new ConflictError('this user already excist'));
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
      next(new BadRequestError('your data is invalid'));
      return;
    }
    next(e);
  }
};

module.exports = { signUp };
