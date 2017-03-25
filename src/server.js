var socket = require('./code/socket');
var io = require('socket.io')();

module.exports = (port, shared, remote) => {
  io.on('connection', (client) => {
    socket.configure(shared, client, remote);
  });
  io.listen(port);
}
