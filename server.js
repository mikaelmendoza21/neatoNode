const http = require('http');
const url = require('url');
const fs = require('fs');
const pathReader = require('path');
var mimeTypes = require('./fileSettings');

const port = process.argv[2] || 9000;
const rootFileDirectory = "./files"

http.createServer(function (req, res) {
	if(req.method == 'GET'){
		console.log(`${req.method} ${req.url}`);
		
		// parse URL
		const parsedUrl = url.parse(req.url);
		
		// Get path from URL
		var path = `.${parsedUrl.pathname}`;
		console.log(`Requested ${path}`);
		
		fs.exists(path, (exists) => {
		    if(!exists) {
		      // Invalid path
		      res.statusCode = 404;
		      res.end(`File ${path} not found!`);
		      return;
				}
				
		    // Path is Directory, return file list
		    if (fs.statSync(path).isDirectory()){
					if (path.indexOf(rootFileDirectory) == 0){
						fs.readdir(path, function(err, items) {
							var fileList = `Files in directory '${path}' : \n`;
							items.forEach(element => {
								fileList += element + "\n";
							});

							res.end(fileList);
						});
					}
					else {
						// Not allowed to view directory
						res.statusCode = 404;
						res.end(`${path} is not a valid Directory`);
					}
				}
		    
		    // Read from filesystem
		    fs.readFile(path, function(err, data){
		      if(err){
		        res.statusCode = 500;
		        res.end(`Error getting the file: ${err}.`);
		      } 
		      else {
		        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
		        const ext = pathReader.parse(path).ext;
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