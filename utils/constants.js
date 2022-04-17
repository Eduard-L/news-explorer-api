require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Article = require('../models/article');

const {
  NODE_ENV, JWT_SECRET,
} = process.env;

const { SALT = 10, PORT = 3000 } = process.env


const DEFAULTERROR_CODE = 500;
const DEFAULTERROR_MESSAGE = 'something went wrong with the server';

module.exports = {
  NODE_ENV, PORT, DEFAULTERROR_CODE, DEFAULTERROR_MESSAGE, SALT, User, bcrypt, Article, JWT_SECRET,
};
