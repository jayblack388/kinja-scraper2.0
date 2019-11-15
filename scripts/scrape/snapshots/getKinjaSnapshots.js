const getSnapshot = require("./pullSnapshot");
const { KINJA_SITES } = require("../../../constants");

module.exports = async () => {
  KINJA_SITES.forEach(url => {
    console.log(url);
    getSnapshot(url);
  });
};
