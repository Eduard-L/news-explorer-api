const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const myValidator = require('validator');
const { Unauthorized } = require('../utils/ErrorHandler');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return myValidator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new Unauthorized('email or password are wrong'));
    }

    const passVerifivation = await bcrypt.compare(password, user.password);

    if (!passVerifivation) {
      return Promise.reject(new Unauthorized('email or password are wrong'));
    }
    return user;
  } catch (e) {
    return Promise.reject(new Unauthorized('email or password are wrong'));
  }
};

module.exports = mongoose.model('user', userSchema);
