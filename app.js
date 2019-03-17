function sayHello(name)
{
    console.log(name);
}

sayHello('Sujith Acharya');

// Module usage
const log = require('./logger');

log.log('Sujith Acharya');

// Using path module
const path = require('path');

var pathObj = path.parse(__filename);

console.log(pathObj);

// Using operating system details
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total memory: ${totalMemory}\n Free memory: ${freeMemory}`);

// Using file system
const fs = require('fs');

fs.readdir('./', function(err, files){
    if(err) console.log("Error ", err);
    else console.log(files);
});

// Using Event Emitter
const EventEmitter = require('events');
var ee = new EventEmitter();

ee.on('messageEmitted', function(eventArg){
    console.log('Event listner called ', eventArg);
});

ee.emit('messageEmitted', { id: 1, username: 'Sujith Acharya' });

// Event from logger
const Logger = new log.Logger();
Logger.on('logging', function (arg) {
    console.log(arg);
});
Logger.logEmitter('Logging Sujith Acharya');

// Using HTTP
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello Sujith !!');
        res.end();
    }

    if(req.url === '/api/userdetails')
    {
        res.write(JSON.stringify({ firstname: 'Sujith', lastname: 'Acharya', dob: '01-01-1900' }));
        res.end();
    }
});

console.log('Listening to port 3000 ...');
server.listen(3000);





