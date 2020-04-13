const geolocation = require('./utility/geocode');

geolocation.geocode('bangalore', (error, response) => {
    console.log('Error', error);
    console.log('Data', response);
});