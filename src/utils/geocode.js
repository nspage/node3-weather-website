const request = require('request')


// const urlMapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHJhc2hwYW5kYSIsImEiOiJjazNsN2U0cGwwNGN5M2dvZGdiaGd6ZWo3In0.oEL6Q-RmkLjjEhKzZDEC_w&limit=1'
// request({ url: urlMapbox, json: true }, (error, response) => {
//     if (error) {
//         console.log('Low level error detected')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find the queried location')
//     } else {
//         const centerLat = (response.body.features[0].center[1])
//         const centerLong = (response.body.features[0].center[0])
//         console.log(centerLat, centerLong)
//     }
// })


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJhc2hwYW5kYSIsImEiOiJjazNsN2U0cGwwNGN5M2dvZGdiaGd6ZWo3In0.oEL6Q-RmkLjjEhKzZDEC_w&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if(error)  {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode