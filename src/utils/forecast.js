const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/f91288c20e883204a0efc36c7ac34298/${longitude},${latitude}`;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service');
        } else if (response.body.error) {
            callback('Could not find the location');
        } else {
            const data = response.body;
            callback(undefined, {
                summary: data.currently.summary,
                temperature: data.currently.temperature
            });
        }
    });
};

module.exports = forecast;