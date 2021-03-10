const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Arturo de Souza"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Arturo de Souza"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Do you wanna help?",
        message: "Too bad hahaha",
        name: "Arturo de Souza"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error})
        forecast(latitude, longitude, (error, {forecast} = {}) => {
            if (error) return res.send({error})
            res.send({
                location,
                forecast,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404page', {
        title: "404",
        name: "Arturo de Souza",
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: "404",
        name: "Arturo de Souza",
        errorMessage: 'Page not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".")
})