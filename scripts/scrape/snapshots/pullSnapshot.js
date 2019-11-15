const axios = require("axios");
const fs = require("fs");
const getSnapshot = async url => {
  console.log(url);
  const response = await axios.get(url);
  const hostName = url.split("/")[2].split(".")[0];
  fs.writeFile(`${__dirname}/${hostName}.txt`, response.data, err => {
    if (err) throw err;
    console.log(`${hostName}.txt saved`);
  });
};

module.exports = getSnapshot;
