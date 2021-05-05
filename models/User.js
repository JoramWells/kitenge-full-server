const Sequelize = require("sequelize");
const db = require("../config/connection");

//create user table
const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  token: {
    type: Sequelize.STRING,
  },
  tokenExp: {
    type: Sequelize.INTEGER,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
});
User.beforeSync(() => console.log("Creating usertable"));
User.afterSync(() => console.log("Created usertable"));
module.exports = User;
