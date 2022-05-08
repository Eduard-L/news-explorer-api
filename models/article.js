const mongoose = require('mongoose');
const myValidator = require('validator');

const articlesSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return myValidator.isURL(v, { require_protocol: true, allow_underscores: true });
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return myValidator.isURL(v, { require_protocol: true, allow_underscores: true });
      },
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,

  },
});

module.exports = mongoose.model('articles', articlesSchema);
