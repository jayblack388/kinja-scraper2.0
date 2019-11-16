const db = require("../models");
const { scrape } = require("../scripts/scrape");
const titleToSite = choice => {
  let site = "";
  switch (choice) {
    case "Gizmodo":
      site = "https://gizmodo.com";
      break;
    case "The A.V. Club":
      site = "https://avclub.com";
      break;
    case "Deadspin":
      site = "https://deadspin.com";
      break;
    case "Jalopnik":
      site = "https://jalopnik.com";
      break;
    case "Jezebel":
      site = "https://jezebel.com";
      break;
    case "Kotaku":
      site = "https://kotaku.com";
      break;
    case "Lifehacker":
      site = "https://lifehacker.com";
      break;
    case "Splinter":
      site = "https://splinternews.com";
      break;
    case "The Root":
      site = "https://theroot.com";
      break;
    case "The Takeout":
      site = "https://thetakeout.com";
      break;
    case "Clickhole":
      site = "https://clickhole.com";
      break;
    case "The Onion":
      site = "https://theonion.com";
      break;
    case "The Inventory":
      site = "https://theinventory.com";
      break;
    default:
      console.log("This shouldn't happen");
  }
  return site;
};

module.exports = {
  findAll: (req, res) => {
    db.Headline.find({})
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  },
  findById: (req, res) => {
    db.Headline.findById(req.params.id)
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  },
  scrapeById: async (req, res) => {
    const title = req.params.id;
    const choice = titleToSite(title);
    await scrape(choice);
    db.Headline.find({})
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(401).json(err));
  }
};
