'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// method invocation
var mockInvocation = function mockInvocation(invoke, path) {
  return function () {
    invoke(path.slice(1), Object.values(arguments || {}));
  };
};

// trasform mock object to real object with functions
var input = function input(obj, invoke, path) {

  for (var key in obj) {

    var value = obj[key];
    var dot = (path || '') + '.' + key;

    if (value == '$function') {
      obj[key] = mockInvocation(invoke, dot);
      continue;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
      input(value, invoke, dot);
    }
  }

  return obj;
};

// transform real object in mock object
var output = function output(obj) {

  var mock = {};

  for (var key in obj) {

    var value = obj[key];

    if (typeof value == 'function') {
      mock[key] = '$function';
      continue;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
      mock[key] = output(value);
      continue;
    }

    mock[key] = value;
  }

  return mock;
};

exports.input = input;
exports.output = output;