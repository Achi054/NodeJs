const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });

        if(error) 
            return callback(error);

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));

        callback();

        io.to(user.room).emit('roomUsers', { room: user.room, users: getUsersInRoom(user.room) });
    });

    socket.on('sentMessage', (message, callback) => {
        var filter = new Filter();
        if(filter.isProfane(message))
            callback('Profanity not allowed!');

        const user = getUser(socket.id);
        if(user)
        {
                io.to(user.room).emit('message', generateMessage(user.username, message));
                callback();
        }
    });

    socket.broadcast.emit('sentMessage', generateMessage('A new user has connected!'));

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
            callback();
        }
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`));
            io.to(user.room).emit('roomUsers', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

server.listen(port, () => console.log(`App started at port ${port}!`));