require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Article = require('../models/article');

const {
  NODE_ENV, PORT, JWT_SECRET,
} = process.env;

const SALT = 10;

const DEFAULTERROR_CODE = 500;
const DEFAULTERROR_MESSAGE = 'something went wrong with the server';

module.exports = {
  NODE_ENV, PORT, DEFAULTERROR_CODE, DEFAULTERROR_MESSAGE, SALT, User, bcrypt, Article, JWT_SECRET,
};
