const mongooseTimestamp = () => {
  const currentDate = new Date();
  const timezoneOffsetFromUTC = currentDate.getTimezoneOffset();

  return Math.floor(new Date(currentDate.getTime() - timezoneOffsetFromUTC));
};

module.exports = mongooseTimestamp;
