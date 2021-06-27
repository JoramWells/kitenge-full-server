const Sequelize = require("sequelize");
const db = require("../config/connection");

//Create product model
const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    selling_price: {
      type: Sequelize.INTEGER,
    },
    discount: {
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    image: {
      type: Sequelize.STRING,
    },
    ratings: {
      type: Sequelize.FLOAT,
    },
    category: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    views: {
      type: Sequelize.INTEGER,
    },
  },
  {
    hooks: {
      beforeValidate: function (product) {
        product.discount =
          ((product.price - product.selling_price) / product.price) * 100;
      },
    },
  }
);

module.exports = Product;
