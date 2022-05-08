require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Article = require('../models/article');

const {
  NODE_ENV, JWT_SECRET, SALT = 10, PORT = 3000,
} = process.env;

const UNAUTHORIZED_MESSAGE = 'Authorization required';
const DEFAULTERROR_CODE = 500;
const DEFAULTERROR_MESSAGE = 'something went wrong with the server';
const DATA_INVALID_MESSAGE = 'your data is invalid';
const NOT_FOUND_MESSAGE = 'resourse not founded';
const WRONG_LOGIN_MESSAGE = 'password or email are wrong';
const CONFLICT_ERROR_MESSAGE = 'resourse already excist';
const PERMISSION_ERROR_MESSAGE = 'permission denied';
const MONGO_ADRESS = 'mongodb://localhost:27017/newsdb';
const SECRET_KEY_DEV_MODE = 'dev-secret'

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_ADRESS,
  PERMISSION_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  WRONG_LOGIN_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  DATA_INVALID_MESSAGE,
  DEFAULTERROR_CODE,
  DEFAULTERROR_MESSAGE,
  SALT,
  User,
  bcrypt,
  Article,
  JWT_SECRET,
  SECRET_KEY_DEV_MODE
};
