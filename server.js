const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('client/build'));

app.use(routes);

mongoose.Promise = global.Promise;
const databaseUri = 'mongodb://localhost:27017/kinja-scraper';

mongoose.connect(process.env.MONGODB_URI || databaseUri, {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
