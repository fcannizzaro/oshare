'use strict';

var random = require("random-id");
var callbacks = {};

// store callback and assign an id
var output = function output(args) {
  return (args || []).map(function (arg) {
    if (typeof arg == 'function') {
      var id = '$cb.' + random(10);
      callbacks[id] = arg;
      return id;
    }
    return arg;
  });
};

// mock callback
var input = function input(args, invoke) {
  return (args || []).map(function (arg) {
    if (is(arg)) {
      return function () {
        invoke(arg, Object.values(arguments || {}));
      };
    }
    return arg;
  });
};

// run callback by id and arguments
var execute = function execute(id, args) {
  callbacks[id].apply(null, args);
};

// check if argument is a callback
var is = function is(arg) {
  return typeof arg == 'string' && /\$cb\..*/g.test(arg);
};

exports.is = is;
exports.execute = execute;
exports.input = input;
exports.output = output;