const fs = require("fs");
const cheerio = require("cheerio");
const {
  scrape2Children,
  scrape3Children,
  scrape4Children
} = require("../helpers");
/* eslint-disable no-undef */
test("scrape2Children", () => {
  fs.readFile(`${__dirname}/../snapshots/theroot.txt`, (err, data) => {
    if (err) throw err;
    const $ = cheerio.load(data.toString());
    $("article").each(function(i, element) {
      if ($(element).contents().length === 2) {
        const headline = scrape2Children($, element);
        expect(headline).toBeDefined();
        expect(headline).toHaveProperty("title");
        expect(headline).toHaveProperty("link");
        expect(headline.title).toBeDefined();
        expect(headline.link).toBeDefined();
      }
    });
  });
});
test("scrape3Children", () => {
  fs.readFile(`${__dirname}/../snapshots/theroot.txt`, (err, data) => {
    if (err) throw err;
    const $ = cheerio.load(data.toString());
    $("article").each(function(i, element) {
      if ($(element).contents().length === 3) {
        const headline = scrape3Children($, element);
        expect(headline).toBeDefined();
        expect(headline).toHaveProperty("title");
        expect(headline).toHaveProperty("link");
        expect(headline.title).toBeDefined();
        expect(headline.link).toBeDefined();
      }
    });
  });
});
test("scrape4Children", () => {
  fs.readFile(`${__dirname}/../snapshots/theroot.txt`, (err, data) => {
    if (err) throw err;
    const $ = cheerio.load(data.toString());
    $("article").each(function(i, element) {
      if ($(element).contents().length === 4) {
        const headline = scrape4Children($, element);
        expect(headline).toBeDefined();
        expect(headline).toHaveProperty("title");
        expect(headline).toHaveProperty("link");
        expect(headline.title).toBeDefined();
        expect(headline.link).toBeDefined();
      }
    });
  });
});

// Lets fs shut down gracefully
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 900)); // avoid jest open handle error
});
