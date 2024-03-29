const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF0b2FnaCIsImEiOiJja3QxZmx4bTMwZXJ6MnBuMnM4eW91MGsyIn0.P7bd5C0Or5MvlsKpk8HWQQ&limit=1';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location. Try another seach', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode