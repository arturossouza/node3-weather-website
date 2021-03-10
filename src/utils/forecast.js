const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=489f65281a343b1578a0c7a7068b57ce&query='+ latitude +','+ longitude +'&units=m'

    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback( 'Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location!', undefined)
        } else {
            const forecast = body.current.weather_descriptions[0]
            const locName = body.location.name
            const locCountry = body.location.country
            const locRegion = body.location.region
            callback(undefined, {
                forecast,
                locName,
                locCountry,
                locRegion
            })
        }
    })
} 

module.exports = forecast