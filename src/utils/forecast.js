const request = require('request')

// const urlDarksky = 'https://api.darksky.net/forecast/e07c7c781a5fe1487cc3aecb29692641/37.8267,-122.4233?units=si&lang=fr'
// request({ url: urlDarksky, json: true }, (error, response) => {
//    if (error) {
//     console.log('Unable to connect to weather service!')
//    } else if (response.body.error) {
//     console.log('Unable to find location')
//    } else {
//     console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//    }  
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e07c7c781a5fe1487cc3aecb29692641/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url : url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
           } else if (body.error) {
            callback('Unable to find location', undefined)
           } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
           } 
    })
}

module.exports = forecast