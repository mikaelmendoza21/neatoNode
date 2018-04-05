const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
var mimeTypes = require('./fileSettings');

const port = process.argv[2] || 9000;

http.createServer(function (req, res) {
	if(req.method == 'GET'){
		console.log(`${req.method} ${req.url}`);
		
		// parse URL
		const parsedUrl = url.parse(req.url);
		
		// extract URL path
		var pathname = `.${parsedUrl.pathname}`;
		console.log(`Requested ${pathname}`);
		
		fs.exists(pathname, (exists) => {
		    if(!exists) {
		      // if the file is not found, return 404
		      res.statusCode = 404;
		      res.end(`File ${pathname} not found!`);
		      return;
		    }
		    // if is a directory, then look for index.html
		    if (fs.statSync(pathname).isDirectory()) {
		      pathname += '/index.html';
		    }
		    
		    // Read from filesystem
		    fs.readFile(pathname, function(err, data){
		      if(err){
		        res.statusCode = 500;
		        res.end(`Error getting the file: ${err}.`);
		      } 
		      else {
		        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
		        const ext = path.parse(pathname).ext;
		        // if the file is found, set Content-type and send data
		        res.setHeader('Content-type', mimeTypes[ext] || 'text/plain' );
		        res.end(data);
		      }
		    });
		});
	}
	else{
		res.statusCode = 500;
		res.end('Http Method not supported');
	}
}).listen(parseInt(port));
console.log(`neatoNode Server listening on port ${port}`);