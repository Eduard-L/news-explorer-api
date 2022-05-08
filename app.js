const express = require('express');

const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT, NODE_ENV, MONGO_ADRESS } = require('./utils/constants');
const { handleErrors } = require('./middlewares/errorHandler');
const { mainRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./helpers/limiter');

mongoose.connect(MONGO_ADRESS);


app.use(limiter);

app.use(helmet());

app.disable('x-powered-by');

app.use(bodyParser.json());

app.use(cors());

app.options('*', cors());

app.use(requestLogger);

app.use('/', mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`everything works at port ${PORT}`);
  });
}
