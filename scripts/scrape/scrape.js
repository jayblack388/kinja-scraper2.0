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
    console.log("That article is already in the database");
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
  if (scrapedHeadlines.length !== 0) {
    db.Headline.create(scrapedHeadlines)
      .then(createdResultArr => {
        console.log("\n");
        console.log("\n");
        console.log(`Scrape of ${url} Complete`);
        console.log("================================================");
      })
      .catch(err => {
        console.log("err => ", err);
      });
  }
};
module.exports = () => {
  // KINJA_SITES.forEach(url => {
  // scrape(url);
  // });
  scrape(KINJA_SITES[0]);
};
// module.exports = async (choice, res) => {
//   let parsedChoice = choice;
//   if (parsedChoice.indexOf('%') >= 0) {
//     parsedChoice = parsedChoice.replace('&', ' ');
//   }
//   let url;
//   const resultArr = [];
//   switch (parsedChoice) {
//     case 'Gizmodo':
//       url = 'https://gizmodo.com';
//       break;
//     case 'The A.V. Club':
//       url = 'https://avclub.com';
//       break;
//     case 'Deadspin':
//       url = 'https://deadspin.com';
//       break;
//     case 'Jalopnik':
//       url = 'https://jalopnik.com';
//       break;
//     case 'Jezebel':
//       url = 'https://jezebel.com';
//       break;
//     case 'Kotaku':
//       url = 'https://kotaku.com';
//       break;
//     case 'Lifehacker':
//       url = 'https://lifehacker.com';
//       break;
//     case 'Splinter':
//       url = 'https://splinternews.com';
//       break;
//     case 'The Root':
//       url = 'https://theroot.com';
//       break;
//     case 'The Takeout':
//       url = 'https://thetakeout.com';
//       break;
//     case 'Clickhole':
//       url = 'https://clickhole.com';
//       break;
//     case 'The Onion':
//       url = 'https://theonion.com';
//       break;
//     case 'The Inventory':
//       url = 'https://theinventory.com';
//       break;
//     default:
//       console.log('Invalid Scrape Request');
//   }
//   const response = await axios.get(url);
//   const dbHeadlineResults = await db.Headline.find({}).exec();

//   const $ = cheerio.load(response.data);

//   $('article').each(function(i, element) {
//     const header = $(this).find('a');
//     if (header.attr('href').includes('/c/')) {
//       return;
//     }
//     const link = header.attr('href');

//     const siteWithPosSub = link.split('/')[2];
//     const splitSiteWithPosSub = siteWithPosSub.split('.');
//     let site;
//     if (splitSiteWithPosSub.length > 2) {
//       splitSiteWithPosSub.splice(0, 1);
//       site = splitSiteWithPosSub.join('.');
//     } else {
//       site = siteWithPosSub;
//     }

//     const title = header.children('h2').text();
//     const summary = $(this)
//       .find('p')
//       .text();

//     const result = {
//       title,
//       link,
//       site,
//       summary
//     };
//     if (!contains(result, 'link', dbHeadlineResults)) {
//       resultArr.push(result);
//     } else {
//       console.log('That article is already in the database');
//     }
//   });
//   db.Headline.create(resultArr)
//     .then(createdResultArr => {
//       db.Headline.find({})
//         .sort({ date: -1 })
//         .then(dbResultArr => {
//           res.status(200).json(dbResultArr);
//         })
//         .catch(err => {
//           res.status(401).json(err);
//         });
//     })
//     .catch(err => {
//       res.status(401).json(err);
//     });
// };
