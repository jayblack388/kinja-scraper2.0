const getSite = require("./getSite");

function scrape3Children($, element) {
  const content = $(element).children("div:nth-child(3)");
  const headerContainer = $(content)
    .children("div")
    .children("div");
  let header = $(headerContainer).children("a");
  let link = header.attr("href");
  let title = header.children("h2").text();
  if (link === undefined || title === undefined) {
    header = $(headerContainer).find("a");
    link = header.attr("href");
    title = header.text();
  }
  const tagContainer = $(content).children("div:nth-child(4)");
  if (link === undefined) console.log(element);
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
  const site = getSite(link);
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
module.exports = scrape3Children;
