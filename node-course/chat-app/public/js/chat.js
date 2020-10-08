var socket = io();

socket.on('counterUpdated', (counter) => {
    console.log(`Counter value: ${counter}`);
});

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment');
});