const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utility/geocode');

const wwwpath = path.join(__dirname, '../wwwroot');
const viewspath = path.join(__dirname, '../wwwroot/templates/views');
const partialspath = path.join(__dirname, '../wwwroot/templates/partials');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(wwwpath));
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.get('', (req, res) =>
    res.render('index', {
        title: 'Weather Application!',
        name: 'Sujith Acharya'
    })
);

app.get('/about', (req, res) =>
    res.render('about', {
        title: 'About Weather!',
        name: 'Sujith Acharya'
    })
);

app.get('/help', (req, res) =>
    res.render('help', {
        title: 'Ask me!',
        name: 'Sujith Acharya'
    })
);

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "Address must be specified."
        });
    }

    geoCode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({ error: error});
        }
        res.send({
            latitude,
            longitude,
            location
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        text: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        text: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Web server is up at port ' + port);
});