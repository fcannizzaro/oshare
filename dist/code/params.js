'use strict';

var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

var params = function params(func) {
  var str = func.toString().replace(STRIP_COMMENTS, '');
  return str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(ARGUMENT_NAMES) || [];
};

exports.from = function (obj, fn) {
  return params(fn).map(function (p) {
    return obj[p];
  });
};