const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connection', (socket) => {
    socket.on('sentMessage', (message, callback) => {
        var filter = new Filter();
        if(filter.isProfane(message))
            callback('Profanity not allowed!');

        io.emit('message', message);
        callback();
    });

    socket.broadcast.emit('sentMessage', 'A new user has connected!');

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('sentMessage', 'A user has left!');
    });
});

server.listen(port, () => console.log(`App started at port ${port}!`));