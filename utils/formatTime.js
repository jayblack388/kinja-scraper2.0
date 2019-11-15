const { addMinutes, subMinutes, format } = require("date-fns");
const toUTC = date => {
  const offset = date.getTimezoneOffset();

  return Math.sign(offset) !== -1
    ? addMinutes(date, offset)
    : subMinutes(date, Math.abs(offset));
};
const formatTime = (timestamp, formatStr) => format(+toUTC(new Date(timestamp)), formatStr);

// formatTime(Date.now(), "MM/dd/yyyy HH:mm:ss");
module.exports = formatTime;
