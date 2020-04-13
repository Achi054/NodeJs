const request = require('request');

const geocode = (address, callback) => {
	var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYWNoaTA1NCIsImEiOiJjazh5NmJocXQxZXQ3M21qczBjMDMwdzVnIn0.-2WHA9cosSue-iYFX9uxfQ`;

	request({ url, json: true }, (error, response) => {
		if (error) callback('Unable to access the service!');
		else if (response.body.message) callback(`Location ${response.message}`);
		else {
			callback(undefined, {
				latitude: response.body.features[0].center[0],
				longitude: response.body.features[0].center[1],
				location: response.body.features[0].place_name,
			});
		}
	});
};

module.exports = {
	geocode: geocode,
};
