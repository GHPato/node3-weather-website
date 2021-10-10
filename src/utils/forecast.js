const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e997bab0eef68c6265970eba6bca6f49&query=${latitude},${longitude}&units=f`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server!', undefined);
        } else if (body.error) {
            callback('Unable to find weather for the given location. Please try another location', undefined);
        } else {
            //callback(undefined, `${body.current.weather_descriptions[0]}. 
            callback(undefined, `It is currently ${body.current.temperature} degrees but it feels like ${body.current.feelslike} degrees.`)
        }
    })
}


module.exports = forecast