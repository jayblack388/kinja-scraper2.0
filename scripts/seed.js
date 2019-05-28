const mongoose = require('mongoose');
const db = require('../models');
mongoose.Promise = global.Promise;

var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/refactored-octo-lamp';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

const userSeed = [
  {
    name: { firstName: 'John', lastName: 'Blackwell' },
    email: 'jblackwell072588@gmail.com',
  },
];

db.Data.deleteMany({});
db.User.deleteMany({})
  .then(() => {
    db.User.insertMany(userSeed)
      .then(userRes => {
        console.log(`${userRes.length} Records added`);
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
