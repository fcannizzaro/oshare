var socket = require('./code/socket');
var io = require('socket.io-client');

module.exports = (url, shared, remote) => {
  var client = require('socket.io-client')('http://localhost:3000');
  socket.configure(shared, client, remote);
}
