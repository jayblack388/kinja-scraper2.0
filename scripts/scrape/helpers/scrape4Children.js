function scrape4Children($, element) {
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
module.exports = scrape4Children;
