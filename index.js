const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)})

const { heroRouter } = require('./routes');
const { configs } = require('./configs');

mongoose.connect(configs.MONGO_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressFileUpload({}));
app.use('/ping', (req, res) => res.json('pong'));
app.use('/heros', heroRouter);

app.use('*', (req, res) => {
  res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
  res
      .status(err.status || 500)
      .json({
        error: err.message || 'Unknown Error',
        code: err.status || 500
      });
});

app.listen(configs.PORT, () => {
  console.log(`Started on port ${configs.PORT}`);
});
