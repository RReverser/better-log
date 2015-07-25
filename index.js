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

function beautifyArgs(maybeFormat) {
	var formats = [];
	var args = new Array(arguments.length);
	if (typeof maybeFormat === 'string') {
		formats.push('%s');
		args[0] = maybeFormat.replace(/%[sdj]/g, function (format) {
			formats.push(format);
			return '%s';
		});
	}
	for (var i = 1; i < args.length; i++) {
		var arg = arguments[i];
		var format = i < formats.length ? formats[i] : '%?';
		if (format === '%s' || format === '%?' && typeof arg === 'string') {
			arg = String(arg);
		} else {
			if (format === '%d') {
				arg = Number(arg);
			}
			arg = inspect(arg, config);
		}
		args[i] = arg;
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