const request = require('request');

module.exports = (lon, lat, callback) => {
    const weatherKey = '8b399ebfe4a822cc2bab308f9257dbf0';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather server', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, body);
        }
    })
}

// WeatherCode




