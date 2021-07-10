const NodeGeocoder = require('node-geocoder')
const options = {
    provider:"mapquest",
    httpAdapter:'https',
    apiKey:"tHP2w7GzVoTP3vQMkmdzqf8F8XQaN4Iu",
    formatter:null
    
}
const geocoder = NodeGeocoder(options)
module.exports = geocoder