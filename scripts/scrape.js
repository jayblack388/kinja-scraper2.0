const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

const contains = (obj, key, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (obj[key] === arr[i][key]) {
      return true;
    }
  }
  return false;
};

function scrape2($, element) {
  const content = $(element).children("div:nth-child(2)");
  let headerContainer = $(content).children("div:nth-child(5)");
  let header = $(headerContainer).children("a");
  let link = header.attr("href");
  let title = header.children("h2").text();
  const tags = [];
  if (link === undefined || title === undefined) {
    headerContainer = $(content).children("div:nth-child(4)");
    header = $(headerContainer).children("a");
    link = header.attr("href");
    title = header.children("h2").text();
  } else {
    const tagContainer = $(content).children("div:nth-child(4)");
    $(tagContainer)
      .children("a")
      .each((i, el) => {
        const tag = {
          link: $(el).attr("href"),
          text: $(el)
            .children("span")
            .text()
        };
        tags.push(tag);
      });
  }
  const siteWithPosSub = link.split("/")[2];
  const splitSiteWithPosSub = siteWithPosSub.split(".");
  let site;
  if (splitSiteWithPosSub.length > 2) {
    splitSiteWithPosSub.splice(0, 1);
    site = splitSiteWithPosSub.join(".");
  } else {
    site = siteWithPosSub;
  }
  // console.log("Link => ", link);
  // console.log("Title => ", title);
  // console.log("Tags => ", tags);
  // console.log("Site => ", site);
  // console.log("================================================");
  const headline = {
    link,
    title,
    tags,
    site
  };
  return headline;
}
function scrape3($, element) {
  const content = $(element).children("div:nth-child(3)");
  const headerContainer = $(content)
    .children("div")
    .children("div");
  const header = $(headerContainer).children("a");
  const link = header.attr("href");
  const title = header.children("h2").text();
  const tagContainer = $(content).children("div:nth-child(4)");
  const tags = [];
  $(tagContainer)
    .children("a")
    .each((i, el) => {
      const tag = {
        link: $(el).attr("href"),
        text: $(el)
          .children("span")
          .text()
      };
      tags.push(tag);
    });
  const siteWithPosSub = link.split("/")[2];
  const splitSiteWithPosSub = siteWithPosSub.split(".");
  let site;
  if (splitSiteWithPosSub.length > 2) {
    splitSiteWithPosSub.splice(0, 1);
    site = splitSiteWithPosSub.join(".");
  } else {
    site = siteWithPosSub;
  }
  // console.log("Link => ", link);
  // console.log("Title => ", title);
  // console.log("Tags => ", tags);
  // console.log("Site => ", site);
  // console.log("================================================");
  const headline = {
    link,
    title,
    tags,
    site
  };
  return headline;
}

function scrape4($, element) {
  const content = $(element).children("div:nth-child(4)");
  const headerContainer = $(content)
    .children("div")
    .children("div:nth-child(2)");
  const header = $(headerContainer).children("a");
  const link = header.attr("href");
  const title = header.children("h2").text();
  const tagContainer = $(content)
    .children("div")
    .children("div")
    .children("a");
  const tags = [];
  const tag = {
    link: $(tagContainer).attr("href"),
    text: $(tagContainer)
      .children("span")
      .text()
  };
  tags.push(tag);
  const siteWithPosSub = link.split("/")[2];
  const splitSiteWithPosSub = siteWithPosSub.split(".");
  let site;
  if (splitSiteWithPosSub.length > 2) {
    splitSiteWithPosSub.splice(0, 1);
    site = splitSiteWithPosSub.join(".");
  } else {
    site = siteWithPosSub;
  }
  // console.log("Link => ", link);
  // console.log("Title => ", title);
  // console.log("Tags => ", tags);
  // console.log("Site => ", site);
  // console.log("================================================");
  const headline = {
    link,
    title,
    tags,
    site
  };
  return headline;
}

// TODO write test and then apply to each site, look for edges

module.exports = async (url = "https://gizmodo.com") => {
  const dbHeadlineResults = await db.Headline.find({}).exec();
  const scrapedHeadlines = [];
  const response = await axios.get(url);

  const $ = cheerio.load(`${response.data}`);
  // Try to just pull articles from within main
  $("article").each(function(i, element) {
    let headline;
    console.log($(element).contents().length);
    if ($(element).contents().length === 2) {
      headline = scrape2($, element);
    } else if ($(element).contents().length === 3) {
      headline = scrape3($, element);
    } else if ($(element).contents().length === 4) {
      headline = scrape4($, element);
    }
    console.log(headline);
    if (!contains(headline, "link", dbHeadlineResults)) {
      scrapedHeadlines.push(headline);
    } else {
      console.log("That article is already in the database");
    }
  });
  if (scrapedHeadlines.length !== 0) {
    db.Headline.create(scrapedHeadlines)
      .then(createdResultArr => {
        console.log("createdResultArr => ", createdResultArr);
      })
      .catch(err => {
        console.log("err => ", err);
      });
  }
  // console.log(dbHeadlineResults);
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
