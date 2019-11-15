const getSite = require("./getSite");
function scrape4Children($, element) {
  const content = $(element).children("div:nth-child(4)");
  let headerContainer = $(content)
    .children("div")
    .children("div:nth-child(2)");
  let header = $(headerContainer).children("a");
  let link = header.attr("href");
  let title = header.children("h2").text();
  let tagContainer = $(content)
    .children("div")
    .children("div")
    .children("a");
  if (link === undefined) {
    headerContainer = $(content)
      .children("div:nth-child(4)")
      .children("div");
    header = $(headerContainer).children("div:nth-child(2)");
    link = header.attr("href");
    title = header.children("h2").text();
    tagContainer = $(headerContainer).children("div");
    if (link === undefined) {
      header = $(headerContainer).children("div");
      const headlineArray = [];
      $(`${header} > div > p > a`).each((i, subLink) => {
        const linkFromList = header.attr("href");
        const titleFromList = header.text();
        const siteFromList = getSite(linkFromList);
        const result = {
          link: linkFromList,
          title: titleFromList,
          tags: [],
          site: siteFromList
        };
        headlineArray.push(result);
      });
      return headlineArray;
    }
  }
  const tags = [];
  const tag = {
    link: $(tagContainer).attr("href"),
    text: $(tagContainer)
      .children("span")
      .text()
  };
  tags.push(tag);
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
  if (!headline.link || !headline.title) {
    console.log(headline);
    return;
  }
  return headline;
}
module.exports = scrape4Children;
