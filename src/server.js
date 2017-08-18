var socket = require('./code/socket');

module.exports = (port, options, remote, language) => {

  var io = require('socket.io')();

  options = options || {};

  io.on('connection', (client) => {
    socket.configure(options.shared || {}, client, remote, options.authorization);
  });

  // server listen
  io.listen(port);

  // generate interface
  generate(options.shared || {}, language);

  return io;
}

var generate = (shared, language) => {
  if (language == 'java') {
    socket.generateJava(shared);
  }
}
