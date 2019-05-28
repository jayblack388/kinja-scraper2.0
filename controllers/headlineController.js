const db = require('../models');
const scrape = require('../scripts/scrape');

module.exports = {
  findAll: (req, res) => {
    db.Headline.find({})
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Headline.findById(req.params.id)
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  scrapeById: (req, res) => {
    const choice = req.params.id;
    scrape(choice, res);
  },
};
