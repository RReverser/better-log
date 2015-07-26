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
	var i = 0;
	if (typeof maybeFormat === 'string' && args.length > 1) {
		formats.push('%s');
		args[i++] = maybeFormat.replace(/%[sdj]/g, function (format) {
			formats.push(format);
			return '%s';
		});
	}
	while (i < args.length) {
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
		args[i++] = arg;
	}
	return args;
}

function betterLog() {
	return log.apply(console, beautifyArgs.apply(undefined, arguments));
}

function betterError() {
	return error.apply(console, beautifyArgs.apply(undefined, arguments));
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