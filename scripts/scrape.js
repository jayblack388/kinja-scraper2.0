const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

const contains = (obj, key, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === obj.key) {
      return true;
    }
  }
  return false;
};

module.exports = async (choice, res) => {
  let url;
  // const dbArticleArr = [];
  const resultArr = [];
  console.log(choice);
  switch (choice) {
    case 'Gizmodo':
      url = 'http://www.gizmodo.com';
      break;
    case 'Kotaku':
      url = 'http://www.kotaku.com';
      break;
    case 'io9':
      url = 'http://www.io9.com';
      break;
    case 'Deadspin':
      url = 'http://www.deadspin.com';
      break;
    case 'Jalopnik':
      url = 'http://www.jalopnik.com';
      break;
    case 'A.V. Club':
      url = 'http://www.avclub.com';
      break;
    case 'Earther':
      url = 'http://www.earther.com';
      break;
    case 'Jezebel':
      url = 'http://www.jezebel.com';
      break;
    case 'Lifehacker':
      url = 'http://www.lifehacker.com';
      break;
    case 'Splinter':
      url = 'http://www.splinternews.com';
      break;
    case 'Takeout':
      url = 'http://www.thetakeout.com';
      break;
    case 'The Root':
      url = 'http://www.theroot.com';
      break;
    case 'The Onion':
      url = 'http://www.theonion.com';
      break;
    default:
      console.log('Invalid Scrape Request');
  }
  const response = await axios.get(url);
  // console.log(response)
  const dbHeadlineResults = await db.Headline.find({});
  // console.log(dbHeadlineResults)

  const $ = cheerio.load(response.data);
  $('article').each(function(i, element) {
    let header = $(this)
      .children('header')
      .children('h1')
      .children('a');
    console.log(header);
    let content = $(this).children('div.item__content');
    let summary = content.children('div.excerpt').children('p');
    let thumb = content
      .find('picture')
      .children('source')
      .attr('data-srcset');

    const result = {};
    result.title = header.text();
    result.link = header.attr('href');
    result.summary = summary.text();
    result.thumbnail = thumb;
    if (!contains(result, result.link, dbHeadlineResults)) {
      resultArr.push(result);
    } else {
      console.log('That article is already in the database');
    }
  });
  db.Headline.create(resultArr)
    .then(dbResultArr => {
      res.json(dbResultArr);
    })
    .catch(err => {
      res.json(err);
    });

  // axios.get(url).then(function(response) {
  //   db.Headline.find({}).then(function(dbResultArr) {
  //     dbResultArr.forEach(function(result) {
  //       dbArticleArr.push(result);
  //     });
  //   });
  //   var $ = cheerio.load(response.data);

  //   $('article').each(function(i, element) {
  //     let header = $(this)
  //       .children('header')
  //       .children('h1')
  //       .children('a');
  //     let content = $(this).children('div.item__content');
  //     let summary = content.children('div.excerpt').children('p');
  //     let thumb = content
  //       .find('picture')
  //       .children('source')
  //       .attr('data-srcset');

  //     var result = {};
  //     result.title = header.text();
  //     result.link = header.attr('href');
  //     result.summary = summary.text();
  //     result.thumbnail = thumb;
  //     if (!contains(result, result.link, dbArticleArr)) {
  //       resultArr.push(result);
  //     } else {
  //       console.log('That article is already in the database');
  //     }
  //   });
  //   db.Headline.create(resultArr)
  //     .then(function(dbResultArr) {
  //       res.json(dbResultArr);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });
};
