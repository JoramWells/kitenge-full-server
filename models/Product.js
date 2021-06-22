const Sequelize = require('sequelize')
const db = require('../config/connection')

//Create product model
const Product = db.define('product',{
    product_name:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER
    },
    discount:{
        type:Sequelize.INTEGER
    },
    stock:{
        type:Sequelize.INTEGER,
    },
    userId:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
    },
    image:{
        type:Sequelize.STRING
    },
    ratings:{
        type:Sequelize.FLOAT
    },
    category:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    views:{
        type:Sequelize.INTEGER
    }
})

module.exports = Product