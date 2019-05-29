const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

const contains = (obj, key, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === obj[key]) {
      return true;
    }
  }
  return false;
};

module.exports = async (choice, res) => {
  let url;
  // const dbArticleArr = [];
  const resultArr = [];
  switch (choice) {
    case 'Gizmodo':
      url = 'https://gizmodo.com';
      break;
    case 'The A.V. Club':
      url = 'https://avclub.com';
      break;
    case 'Deadspin':
      url = 'https://deadspin.com';
      break;
    case 'Jalopnik':
      url = 'https://jalopnik.com';
      break;
    case 'Jezebel':
      url = 'https://jezebel.com';
      break;
    case 'Kotaku':
      url = 'https://kotaku.com';
      break;
    case 'Lifehacker':
      url = 'https://lifehacker.com';
      break;
    case 'Splinter':
      url = 'https://splinternews.com';
      break;
    case 'The Root':
      url = 'https://theroot.com';
      break;
    case 'The Takeout':
      url = 'https://thetakeout.com';
      break;
    case 'Clickhole':
      url = 'https://clickhole.com';
      break;
    case 'The Onion':
      url = 'https://theonion.com';
      break;
    case 'The Inventory':
      url = 'https://theinventory.com';
      break;
    default:
      console.log('Invalid Scrape Request');
  }
  const response = await axios.get(url);
  const dbHeadlineResults = await db.Headline.find({}).exec();

  const $ = cheerio.load(response.data);

  $('article').each(function(i, element) {
    const header = $(this).find('a');
    if (header.attr('href').includes('/c/')) {
      return;
    }
    const link = header.attr('href');

    const siteWithPosSub = link.split('/')[2];
    const splitSiteWithPosSub = siteWithPosSub.split('.');
    let site;
    if (splitSiteWithPosSub.length > 2) {
      splitSiteWithPosSub.splice(0, 1);
      site = splitSiteWithPosSub.join('.');
    } else {
      site = siteWithPosSub;
    }

    const title = header.children('h1').text();
    const summary = $(this)
      .find('p')
      .text();

    const result = {
      title,
      link,
      site,
      summary
    };
    if (!contains(result, 'link', dbHeadlineResults)) {
      resultArr.push(result);
    } else {
      console.log('That article is already in the database');
    }
  });
  db.Headline.create(resultArr)
    .then(dbResultArr => {
      res.status(200).json(dbResultArr);
    })
    .catch(err => {
      res.status(401).json(err);
    });
};
