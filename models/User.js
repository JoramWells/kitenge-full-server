const Sequelize = require("sequelize");
const db = require("../config/connection");

//create User table
const User = db.define("user", {
  id:{
    type:Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull:false,
    primaryKey:true
  },
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
