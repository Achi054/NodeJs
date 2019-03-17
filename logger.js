var url = 'http://logger.io/log';

function log(message)
{
    //Send log details to url
    console.log(message);
}

module.exports.log = log;

// Logger class to emit logging
const EventEmitter = require('events');

class Logger extends EventEmitter {
    logEmitter(message)
    {
        console.log('Logging..');
        this.emit('logging', message);
    }
}

module.exports.Logger = Logger;
