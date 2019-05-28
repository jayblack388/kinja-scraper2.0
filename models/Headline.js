const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: 'Article links must be unique',
  },
  summary: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

const Headline = mongoose.model('Headline', HeadlineSchema);

module.exports = Headline;
