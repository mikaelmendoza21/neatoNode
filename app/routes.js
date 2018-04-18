// This module defines the Routes mapped for the app

var index = require('./controllers/index.controller');
var files = require('./controllers/myFiles.controller');

module.exports = (app) => {

    // Home '/'
    app.get('/', index.render);

    // File Manager '/files'
    app.get('/myFiles', files.render);
};