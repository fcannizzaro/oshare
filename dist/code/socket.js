'use strict';

var dot = require('dot-js')();
var fs = require('fs');
var mock = require('./mock');
var params = require('./params');
var cb = require('./callback');
var generator = require('./generator');

exports.generateJava = function (shared) {
  var code = generator.generate(mock.output(shared));
  fs.writeFileSync(process.cwd() + '/Remote.java', code, 'utf-8');
};

exports.configure = function (shared, socket, remote, authorization) {

  var authorized = false;

  /* Invoke Mock Method on remote */
  var invoke = function invoke(path, args) {

    if (!authorized) {
      return;
    }

    args = cb.output(args);

    socket.emit('invoke', {
      method: path,
      args: args
    });
  };

  // Method Invocation
  socket.on('invoke', function (data) {

    if (!authorized) {
      return;
    }

    if (cb.is(data.method)) {
      cb.execute(data.method, data.args);
      return;
    }

    var fn = shared.dot(data.method);

    if (fn) {
      fn.apply(null, cb.input(data.args, invoke));
    }
  });

  socket.on('authorization', function (data) {

    authorized = authorization == data;

    if (authorized) {
      // share methods / constant
      socket.emit('share', mock.output(shared));
    }
  });

  socket.on('share', function (data) {

    data = mock.input(data, invoke);

    if (remote) {
      remote.apply(null, params.from(data, remote));
    }
  });

  socket.emit('authorization', authorization);
};