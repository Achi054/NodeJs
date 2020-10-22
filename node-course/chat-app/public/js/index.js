var socket = io();

const $existingRooms = document.querySelector('#existingRooms');
const roomTemplate = document.querySelector('#room-template').innerHTML;

$(document).on('click', '#join', (e) => {
    e.preventDefault();
    var username = window.prompt("Enter your name");

    if(username)
    {
        var room = e.target.parentElement.previousElementSibling.innerText
        window.location.href = `./chat.html?username=${username}&room=${room}`;
    }
});

socket.emit('home');

socket.on('rooms', (rooms) => {
    var html = Mustache.render(roomTemplate, {
        rooms
    });
    $existingRooms.insertAdjacentHTML('beforeend', html);
});