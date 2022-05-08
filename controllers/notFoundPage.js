const { NotFoundError } = require('../utils/ErrorHandler');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

const handleNotFoundedPage = (req, res, next) => {
  next(new NotFoundError(`${NOT_FOUND_MESSAGE}`));
};

module.exports = { handleNotFoundedPage };
