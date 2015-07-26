var assert = require('assert');

var expected;

// hook into Node.js output
var stdoutWrite = process.stdout.write;
process.stdout.write = function writeHook(actual) {
	try {
		assert.equal(actual.trimRight(), expected);
	} catch (e) {
		// restore proper output so that we don't go into
		// endless recursion on stack trace print
		process.stdout.write = stdoutWrite;
		throw e;
	}
	stdoutWrite.call(this, 'Passed: ' + actual);
};

var betterLog = require('./');

function test(input, output) {
	expected = output;
	betterLog.apply(console, input);
}

test(['x', 1, { a: 2 }], 'x \u001b[33m1\u001b[39m { a: \u001b[33m2\u001b[39m }');
test(['%d + %j = %s', 1, 2, 3], '\u001b[33m1\u001b[39m + \u001b[33m2\u001b[39m = 3');
test(['%d'], '%d');
test(['%d', 'x'], '\u001b[33mNaN\u001b[39m');
