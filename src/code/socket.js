var dot = require('dot-js')();
var mock = require('./mock');
var params = require('./params');
var cb = require('./callback');

exports.configure = (shared, socket, remote) => {

  /* Invoke Mock Method on remote */
  var invoke = (path, args) => {

    args = cb.output(args);

    socket.emit('invoke', {
      method: path,
      args: args
    });

  };

  // share methods / constant
  socket.emit('share', mock.output(shared));

  // Method Invocation
  socket.on('invoke', (data) => {

    if (cb.is(data.method)) {
      cb.execute(data.method, data.args);
      return;
    }

    let fn = shared.dot(data.method);

    if (fn) {
      fn.apply(null, cb.input(data.args, invoke));
    }

  });

  socket.on('share', (data) => {
    mock.input(data, invoke)
    if (remote) {
      remote.apply(null, params.from(data, remote));
    }
  });

};
