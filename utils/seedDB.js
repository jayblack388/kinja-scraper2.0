const scrape = require("../scripts/scrape");
const db = require("../models");

const seedDB = async () => {
  const dbHeadlineResults = await db.Headline.find({}).exec();
  console.log(dbHeadlineResults)
  console.log(typeof scrape)
  console.log(scrape.scrapeAllWithLogging)
  if (dbHeadlineResults.length === 0) {
    // console.log(scrapeAllWithLogging)
    // await scrapeAllWithLogging(false);
  }
};
module.exports = seedDB;
