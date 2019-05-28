const scrape = require('../scripts/scrape');

module.exports = (app, db) => {
  app.get('/scrape/:id', function(req, res) {
    const choice = req.params.id;
    console.log(choice);
    scrape(choice, res);
  });

  app.get('/headlines', function(req, res) {
    db.Headline.find({})
      .then(function(dbArticles) {
        res.json(dbArticles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get('/headlines/:id', function(req, res) {
    db.Headline.find({
      _id: req.params.id
    })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
