const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');
const { nonExcistPage } = require('./notFountPage');
const { signUp } = require('../controllers/signup');
const { signIn } = require('../controllers/signin');
const { auth } = require('../middlewares/auth');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }),
}), signUp);
mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({

    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }),
}), signIn);

mainRouter.use(auth);

mainRouter.use('/users', usersRouter);
mainRouter.use('/articles', articlesRouter);
mainRouter.use(nonExcistPage);

module.exports = { mainRouter };
