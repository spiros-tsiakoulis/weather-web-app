const request = require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/weathercode');


geoCode(process.argv[2], (err, {lon, lat}) => {
    if (err) {
        return console.log(err);
    }

    forecast(lon, lat, (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })


})