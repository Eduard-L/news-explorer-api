const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { validateURL } = require('../helpers/validator');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', celebrate({
  body: Joi.object().keys({

    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validateURL),
    image: Joi.string().custom(validateURL),

  }),
}), createArticle);

articlesRouter.delete('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteArticle);

module.exports = { articlesRouter };
