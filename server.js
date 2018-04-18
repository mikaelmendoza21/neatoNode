
// Modules
var config = require('./config/config');
var express = require('./config/express.js');

var app = express();
app.listen(config.port);

module.exports = app;
console.log(`neatoNode server running at http://localhost:${config.port}`);