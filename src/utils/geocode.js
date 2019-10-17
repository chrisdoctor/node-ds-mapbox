const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hyaXNkb2N0b3IiLCJhIjoiY2sxdDdoeDllMGJhcjNibXViZXppc2JvZSJ9.y_24fKtGdpJQDAMwVBjuDA&limit=1`;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Could not connect to service.');
        } else if (response.body.features.length === 0) {
            callback('Could not find address.');
        } else {
            const data = response.body;
            const longitude = data.features[0].center[0];
            const latitude = data.features[0].center[1];
            const placename = data.features[0].place_name;

            callback(undefined, {
                longitude,
                latitude,
                placename
            });
        }

    });
};

module.exports = geocode;