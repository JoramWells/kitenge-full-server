const Sequelize = require("sequelize");
const db = require("../config/connection");

//create Category model
const Category = db.define("category", {
  category: {
    type: Sequelize.STRING,
  },
  createdAt:{
    type:Sequelize.DATE,
  },
  updatedAt:{
    type:Sequelize.DATE,
  },
});

Category.beforeSync(() => console.log("Creating category table.."));
Category.afterSync(() => console.log("Created category table!"));

module.exports = Category;
