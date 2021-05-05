const Sequelize = require("sequelize");
const db = require("../config/connection");

//Create order model
const Order = db.define("order", {
  amount: {
    type: Sequelize.STRING,
  },
  receipt: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
});

Order.beforeSync(() => console.log("Creating Ordertable"));
Order.afterSync(() => console.log("Created Ordertable"));
module.exports = Order;
