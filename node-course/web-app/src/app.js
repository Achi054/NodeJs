const path = require('path');
const express = require('express');

const wwwpath = path.join(__dirname, '../wwwroot');
const templatepath = path.join(__dirname, '../wwwroot/templates');
const app = express();

app.use(express.static(wwwpath));
app.set('view engine', 'hbs');
app.set('views', templatepath);

app.get('', (req, res) =>
    res.render('index', {
        title: 'Weather Application!',
        name: 'Sujith Acharya'
    })
);

app.get('/about', (req, res) =>
    res.render('about', {
        title: 'About Weather',
        name: 'Sujith Acharya'
    })
);

app.get('/help', (req, res) =>
    res.render('help', {
        title: 'Ask me',
        name: 'Sujith Acharya'
    })
);

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'forecast',
        location: 'location'
    });
});

app.listen(3000, () => {
    console.log('Web server is up at port 3000');
});