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
  user_info: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  product_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  }
});

module.exports = AIData;
