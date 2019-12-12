const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Nicolas Page'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Nicolas Page'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message: 'Please contact me @**.**.**.** to get immediate help',
        title: 'Help',
        name: 'Nicolas Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    } 
        geocode( req.query.address , (error, {longitude, latitude, location}= {})=> {
            if (error) {
                return res.send({error})
        }
        forecast( latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                })
            })
        })  
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.status('404').render('404',{
        typeOfError: 'Help article',
        title: '404',
        name: 'Nicolas Page'
    })
})

app.get('*', (req, res)=>{
    res.status('404').render('404',{
        typeOfError: 'Page',
        title: '404',
        name: 'Nicolas Page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) 