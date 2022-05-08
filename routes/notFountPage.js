const nonExcistPage = require('express').Router();
const { handleNotFoundedPage } = require('../controllers/notFoundPage');

nonExcistPage.use('*', handleNotFoundedPage);

module.exports = { nonExcistPage };
