const request = require('request');

module.exports =  (location, callback) => {
    const key = 'pk.eyJ1Ijoic3Bpcm9zbSIsImEiOiJja2Eyb2M0ZHgwYzhyM3RwbmNtc2Vjd3hlIn0.5efY-UouF6_8s_RkNrpjyw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${key}&limit=1`;

    request({url, json: true}, (err, res) => {
        if (err) {
            callback("Unable to connect to geo server", undefined);
        } else if(res.body.features.length === 0) {
            callback("Unable to find the location", undefined)
        }
         else {
            callback(undefined, {
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                loc: res.body.features[0].place_name
            });
        }
    })
}