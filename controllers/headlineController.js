const db = require("../models");
const { scrape } = require("../scripts/scrape");

module.exports = {
  findAll: (req, res) => {
    db.Headline.find({})
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  },
  findById: (req, res) => {
    db.Headline.findById(req.params.id)
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  },
  scrapeById: async (req, res) => {
    const choice = req.params.id;
    await scrape(choice);
    db.Headline.find({})
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  }
};
