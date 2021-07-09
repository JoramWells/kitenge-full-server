const NodeGeocoder = require('node-geocoder')
const options = {
    provider:"mapquest",
    apiKey:"tHP2w7GzVoTP3vQMkmdzqf8F8XQaN4Iu",
    formatter:null
    
}
const geocoder = NodeGeocoder(options)

// Using callback
geocoder.geocode('Maseno', function (err, res){
    console.log(res)
})