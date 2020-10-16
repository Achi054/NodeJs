var socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormSend = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages');
const $locations = document.querySelector('#locations');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

const $sendLocationButton = document.querySelector('#send-location');

socket.on('locationMessage', url =>{
    var html = Mustache.render(locationTemplate, {
        url
    });
    $locations.insertAdjacentHTML('beforeend', html);
});

socket.on('message', (message) => {
    var html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);
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