const Sequelize = require('sequelize')
const db = require('../config/connection')


//Create AIData model

const AIData = db.define('aidata',{
    user_info:{
        type:Sequelize.STRING
        
    },
    product_id:{
        type:Sequelize.INTEGER
    },
    start_time:{
        type:Sequelize.DATE
    },
    stop_time:{
        type:Sequelize.DATE
    }
})

module.exports = AIData