const contains = (obj, key, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (obj[key] === arr[i][key]) {
      return true;
    }
  }
  return false;
};

module.exports = contains;
