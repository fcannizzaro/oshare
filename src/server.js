var socket = require('./code/socket');
var io = require('socket.io')();

module.exports = (port, shared, remote, language) => {

  io.on('connection', (client) => {
    socket.configure(shared, client, remote);
  });

  // server listen
  io.listen(port);

  // generate interface
  generate(shared, language);

  return io;
}

var generate = (shared, language) => {
  if (language == 'java') {
    socket.generateJava(shared);
  }
}
