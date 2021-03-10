const request = require('request')

const geocode = (address, callback) => {
    const encodeAdress = encodeURIComponent(address)
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeAdress +".json?access_token=pk.eyJ1IjoiYXJ0dXJvc3NvdXphIiwiYSI6ImNrbTF6aTFiNTBkNXoyb3BpYmh5a2t6bnoifQ.2tslSWARtQ__OdkfFtGVfA&limit=1"

    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const coords = body.features[0].center
            const latitude = coords[1]
            const longitude = coords[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode