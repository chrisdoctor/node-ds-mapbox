const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express configs
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars settings
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Christopherr'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Christopher'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Christopher'
    });
});

app.get('/weather', (req, res) => {
    console.log('req.query', req.query);
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(data.longitude, data.latitude, (error, fdata) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: fdata.summary + '. Temperature is ' + fdata.temperature,
                location: data,
                address: req.query.address
            });
        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        msg: 'Could not find help file',
        name: 'Christopher'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        msg: 'Could not find page',
        name: 'Christopher'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});