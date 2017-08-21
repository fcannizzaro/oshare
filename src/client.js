var socket = require('./code/socket');

const config = (url, options, remote) => {
	var client = require('socket.io-client')(url);
	socket.configure(options.shared || {}, client, remote, options.authorization);
	client.on('reconnect', () => {
		client.disconnect();
		config(url, options, remote);
	});
}

module.exports = config;
