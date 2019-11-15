const getSite = require("./getSite");
function scrape2Children($, element) {
  // console.log(element);
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
    if (link === undefined || title === undefined) {
      headerContainer = $(content).children("div:nth-child(3)");
      header = $(headerContainer).children("a");
      link = header.attr("href");
      title = header.children("h2").text();
    }
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
  if (!headline.link) {
    console.log(headline);
    return;
  } else if (!headline.title) {
    const splitLink = headline.link.split("/");
    let fallbackTitle = splitLink[splitLink.length - 1];
    fallbackTitle = `${fallbackTitle
      .charAt(0)
      .toUpperCase()}${fallbackTitle.slice(1)}`;
    headline.title = fallbackTitle;
    if (!headline.title) {
      console.log(headline);
      return;
    }
    return headline;
  }
  return headline;
}
module.exports = scrape2Children;
