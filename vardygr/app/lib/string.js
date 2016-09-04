export const capitalize = (string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFirstWord = (string = '') => {
  return string.substr(0, string.indexOf(' '));
};

export const getTimeAsString = (date) => {
  var pad = '00';
  var hours = date.getHours() + '';
  var minutes = date.getMinutes() + '';
  return pad.substring(hours.length) + hours  + ':' + pad.substring(minutes.length) + minutes;
};
