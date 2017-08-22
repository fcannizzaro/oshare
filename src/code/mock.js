// method invocation
var mockInvocation = (invoke, path) => {
  return function() {
    invoke(path.slice(1), Array.from(arguments));
  };
};

// trasform mock object to real object with functions
var input = (obj, invoke, path) => {

  for (let key in obj) {

    let value = obj[key];
    let dot = (path || '') + '.' + key;

    if (value == '$function') {
      obj[key] = mockInvocation(invoke, dot);
      continue;
    }

    if (typeof value == 'object') {
      input(value, invoke, dot);
    }

  }

  return obj;

};

// transform real object in mock object
var output = (obj) => {

  let mock = {};

  for (let key in obj) {

    let value = obj[key];

    if (typeof value == 'function') {
      mock[key] = '$function';
      continue;
    }

    if (typeof value == 'object') {
      mock[key] = output(value);
      continue;
    }

    mock[key] = value;

  }

  return mock;

};

exports.input = input;
exports.output = output;
