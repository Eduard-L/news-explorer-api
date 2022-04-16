const { NotFoundError } = require('../utils/ErrorHandler');

const handleNotFoundedPage = (req, res, next) => {
  next(new NotFoundError('page you trying to find doesnt excist'));
};

module.exports = { handleNotFoundedPage };
