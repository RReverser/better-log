'use strict';

var log = console.log;
var error = console.error;
var inspect = require('util').inspect;
var extend = require('util')._extend;
var map = Array.prototype.map;
var config = { depth: 1, colors: true };

function setConfig(newConfig) {
	extend(config, newConfig);
	return betterLog;
}

function beautifyArgs() {
	var args = new Array(arguments.length);
	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		args[i] = typeof arg === 'string' ? arg : inspect(arg, config);
	}
	return args;
}

function betterLog() {
	return log.apply(this, beautifyArgs.apply(undefined, arguments));
}

function betterError() {
	return error.apply(this, beautifyArgs.apply(undefined, arguments));
}

betterLog.error = betterError;

betterLog.setConfig = setConfig;

betterLog.install = function (newConfig) {
	setConfig(newConfig);
	console.error = console.warn = betterError;
	return console.log = console.info = betterLog;
};

betterLog.uninstall = function () {
	return console.log = log;
};

module.exports = betterLog;