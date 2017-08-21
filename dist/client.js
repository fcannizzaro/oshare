'use strict';

var socket = require('./code/socket');

var config = function config(url, options, remote) {
	var client = require('socket.io-client')(url);
	socket.configure(options.shared || {}, client, remote, options.authorization);
	client.on('reconnect', function () {
		client.disconnect();
		config(url, options, remote);
	});
};

module.exports = config;