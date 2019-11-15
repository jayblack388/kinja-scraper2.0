module.exports = link => {
  const siteWithPosSub = link.split("/")[2];
  const splitSiteWithPosSub = siteWithPosSub.split(".");
  let site;
  if (splitSiteWithPosSub.length > 2) {
    if (splitSiteWithPosSub[0] === "www") {
      splitSiteWithPosSub.splice(0, 1);
    }
    site = splitSiteWithPosSub.join(".");
  } else {
    site = siteWithPosSub;
  }
  return site;
};