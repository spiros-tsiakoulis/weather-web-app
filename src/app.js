const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const forecast = require('./utils/weathercode');
const geolocation = require('./utils/geocode');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');



app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Spiros Tsiakoulis'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'Spiros Tsiakoulis'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'Spiros Tsiakoulis'
    })
})

app.get('/weather', (req, res) => {

    // const location = process.argv[2];

    if (!req.query.location) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geolocation(req.query.location, (err, data) => {
        if (err) {
            return res.send({error: err});
        }

        forecast(data.lon, data.lat, (err, data) => {
            if (err) {
                return res.send({error: err});
            }
            res.send(data);
        })
    })
    
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Weather App',
        author: 'Spiros Tsiakoulis',
        error: '404'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});