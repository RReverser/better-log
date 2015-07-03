# better-log

console.log wrapper for a bit more readable output in Node.js

Tired of seeing hardly readable outputs like this?

![regular console.log](https://pbs.twimg.com/media/CFmZABUW0AAqAIK.png)

Replace them with something more elegant!

![better log](https://pbs.twimg.com/media/CFmZBRnWoAABjJi.png)

## Usage

## Installation:

```bash
npm install better-log --save
```

## Replacing built-in `console.log`

```javascript
require('better-log').install();
console.log({ x: 1, y: 'prop' });
```

or

```javascript
require('better-log/install');
```

(useful for ES6-style `import 'better-log/install'`)

Restoring native `console.log`:

```javascript
require('better-log').uninstall();
```

## Manual usage as a regular function

```javascript
var log = require('better-log');
log({ x: 1, y: 'prop' });
```

That's it!
