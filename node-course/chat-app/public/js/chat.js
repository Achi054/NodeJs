var socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormSend = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages');
const $locations = document.querySelector('#locations');
const $sidebar = document.querySelector('#sidebar');
const $sendLocationButton = document.querySelector('#send-location');

// Query string
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// autoscroll

const autoscroll = () => {
    // New message element
    const newMessageElement = $messages.lastElementChild;

    // Height of new message
    const newMessageStyle = getComputedStyle(newMessageElement);
    const newMessageMargin = parseInt(newMessageStyle.marginBottom);
    const newMessageHeight = newMessageElement.offsetHeight + newMessageMargin;

    // Visible height
    const messageHeight = $messages.offsetHeight;

    // Height of message container
    const containerHeight = $messages.scrollHeight;

    // How far to scroll
    const scrollOffset = $messages.scrollTop + messageHeight;

    if(containerHeight - newMessageHeight <= scrollOffset)
        $messages.scrollTop = $messages.scrollHeight;
};

socket.on('roomUsers', ({ room, users }) => {
    var html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    $sidebar.innerHTML = html;
});

socket.on('locationMessage', (location) =>{
    var html = Mustache.render(locationTemplate, {
        username: location.username,
        url : location.url,
        createdAt: location.createdAt
    });
    $locations.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('message', (message) => {
    var html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm a")
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageForm.setAttribute('disabled', 'disabled');

    socket.emit('sentMessage', e.target.elements[0].value, error => {
        $messageForm.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if(error)
            return console.log('Profanity not allowed!');
        
        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', () => {
    $sendLocationButton.setAttribute('disabled', 'disabled');

    if (navigator.geolocation) {
        $sendLocationButton.removeAttribute('disabled');
        return alert('Your browser does not support geolocation!');
    }

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', { latitude: position.coords.latitude, longitude: position.coords.longitude }, message => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});

socket.emit('join', { username, room }, (error) => {
    if(error)
    {
        alert(error);
        location.href = '/';
    }
});