const {
  Article, DATA_INVALID_MESSAGE, NOT_FOUND_MESSAGE, PERMISSION_ERROR_MESSAGE,
} = require('../utils/constants');
const { BadRequestError, NotFoundError, ForbiddentError } = require('../utils/ErrorHandler');

const createArticle = async (req, res, next) => {
  const { _id } = req.user;

  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  try {
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner: _id,
    });
    if (article) {
      res.status(201).send(article);
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

const getArticles = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const articles = await Article.find({}).select('+owner');
    if (articles) {
      const userArticles = articles.filter((article) => article.owner.toHexString() === _id);
      res.status(200).send(userArticles);
    } else {
      throw new Error();
    }
  } catch (e) {
    next(e);
  }
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const articleForDelete = await Article.findById(id).select('+owner');
    if (articleForDelete === null) {
      next(new NotFoundError(`${NOT_FOUND_MESSAGE}`));
      return;
    }

    const articlesOwner = articleForDelete.owner.toHexString();
    if (articlesOwner !== _id) {
      next(new ForbiddentError(`${PERMISSION_ERROR_MESSAGE}`));
      return;
    }

    const deletedArticle = await Article.findByIdAndDelete(id);
    if (deletedArticle) {
      res.status(200).send(deletedArticle);
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError(`${DATA_INVALID_MESSAGE}`));
      return;
    }
    next(e);
  }
};
module.exports = { createArticle, getArticles, deleteArticle };
