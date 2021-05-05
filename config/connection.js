const Sequelize = require('sequelize')
module.exports = new Sequelize('kitenge', 'root','JoramWells18.',{
    host:"localhost",
    dialect:"mysql"
})