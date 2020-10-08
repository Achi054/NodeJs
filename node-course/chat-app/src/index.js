const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

let counter = 0;
io.on('connection', (socket) => {
    console.log('Connection established!')

    socket.emit('counterUpdated', counter);

    socket.on('increment', () => {
        counter++;
        io.emit('counterUpdated', counter);
    });
});

server.listen(port, () => console.log(`App started at port ${port}!`));