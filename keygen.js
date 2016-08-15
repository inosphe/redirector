var keygen = require('keygenerator');
var fs = require('fs');

fs.writeFileSync('session.json', JSON.stringify({session: keygen._()}));
