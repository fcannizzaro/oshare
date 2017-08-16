'use strict';

var socket = require('./code/socket');
var io = require('socket.io-client');

module.exports = function (url, options, remote) {
	var client = require('socket.io-client')(url);
	socket.configure(options.shared || {}, client, remote, options.authorization);
};