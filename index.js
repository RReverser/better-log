'use strict';

var log = console.log;
var inspect = require('util').inspect;
var map = Array.prototype.map;

function betterLog() {
	return log.apply(this, map.call(arguments, function (arg) {
		return inspect(arg, { depth: 1, colors: true });
	}));
}

betterLog.install = function () {
	console.log = betterLog;
};

betterLog.uninstall = function () {
	console.log = log;
};

module.exports = betterLog;