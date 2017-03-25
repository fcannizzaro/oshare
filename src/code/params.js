const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

var params = (func) => {
  var str = func.toString().replace(STRIP_COMMENTS, '');
  return str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(ARGUMENT_NAMES) || [];
};

exports.from = (obj, fn) => {
  return params(fn).map(p => obj[p]);
};
