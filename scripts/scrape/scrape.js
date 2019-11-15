const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../../models");
const { KINJA_SITES } = require("../../constants");
const {
  contains,
  scrape2Children,
  scrape3Children,
  scrape4Children
} = require("./helpers");

// TODO write test and then apply to each site, look for edges

const checkHeadline = ({ headline, dbHeadlineResults, scrapedHeadlines }) => {
  if (
    headline &&
    headline.link &&
    !contains(headline, "link", dbHeadlineResults)
  ) {
    scrapedHeadlines.push(headline);
  } else {
    // console.log("That article is already in the database");
    return;
  }
};

const scrape = async url => {
  const dbHeadlineResults = await db.Headline.find({}).exec();
  const scrapedHeadlines = [];
  const response = await axios.get(url);
  const $ = cheerio.load(`${response.data}`);
  $("article").each(function(i, element) {
    let headline;
    if ($(element).contents().length === 2) {
      headline = scrape2Children($, element);
    } else if ($(element).contents().length === 3) {
      headline = scrape3Children($, element);
    } else if ($(element).contents().length === 4) {
      headline = scrape4Children($, element);
    }
    if (Array.isArray(headline)) {
      headline.forEach(hl =>
        checkHeadline({ headline: hl, dbHeadlineResults, scrapedHeadlines })
      );
    } else {
      checkHeadline({ headline, dbHeadlineResults, scrapedHeadlines });
    }
  });
  const headlinesWithoutDupes = [...new Set(scrapedHeadlines)];
  return new Promise((resolve, reject) => {
    if (headlinesWithoutDupes.length !== 0) {
      db.Headline.create(headlinesWithoutDupes)
        .then(createdResultArr => {
          const newRecords = createdResultArr.length;
          console.log("\n");
          console.log("================================================");
          console.log(`Scrape of ${url} Complete, ${newRecords} new records`);
          console.log("================================================");
          resolve({ success: true, newRecords, error: null });
        })
        .catch(error => {
          console.log("\n");
          console.log("================================================");
          console.log(`Scrape of ${url} interupted, Error ::: ${error}`);
          console.log("================================================");
          reject({ success: false, newRecords: 0, error });
        });
    } else {
      console.log("\n");
      console.log("================================================");
      console.log(`Scrape of ${url} Complete, no new records`);
      console.log("================================================");
      resolve({ success: true, newRecords: 0, error: null });
    }
  });
};
const scrapeAll = async () => {
  let totalRecords = 0;
  const errors = [];
  for (const url in KINJA_SITES) {
    const { error, success, newRecords } = await scrape(KINJA_SITES[url]);
    if (error && !success) {
      errors.push(error);
    } else {
      totalRecords += newRecords;
    }
  }
  if (errors.length > 0) {
    console.log("\n");
    console.log("================================================");
    console.log(`There was a problem Scraping Kinja, Error: ${errors}`);
    console.log("================================================");
  } else {
    console.log("\n");
    console.log("================================================");
    console.log(`Scrape of Kinja Complete, Total records added ${totalRecords}`);
    console.log("================================================");
  }
  // const { error, success, newRecords } = await scrape(KINJA_SITES[0]);
};

module.exports = { scrape, scrapeAll };
