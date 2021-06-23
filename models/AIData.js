const Sequelize = require("sequelize");
const db = require("../config/connection");

//Create AIData model

const AIData = db.define("aidata", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  ipAddr: {
    type: Sequelize.STRING,
  },
  productId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  }
});

module.exports = AIData;
