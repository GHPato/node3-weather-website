const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Customize the server
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');  
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pato GH'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pato GH'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pato GH'
    })
})

app.get('/weather', (req, res) => {
   // res.send('<h1>Weather page</h1><br><br>');
   if (!req.query.address) {   
        return res.send({
            error: 'Error! An address must be provided'
        })
   }
   let address = req.query.address;

   geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            }) }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                         error: error   // error only works since its value it has the same name
                    })
                }
                res.send({
                    location: location, // location only worsk too (same as error case)
                    forecast: forecastData
                })
              })
        })

        })




app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Patrick',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Patrick',
        error: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});

