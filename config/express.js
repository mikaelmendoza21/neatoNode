// modules & config required by Express
var config = require('./config');
var express = require('express');


module.exports = function() {
    var app = express();

    //View settings, EJS as renderer
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Serve static files
    app.use('/files', express.static('files'));

	//Routes
    require('../app/routes.js')(app);

    return app;
};