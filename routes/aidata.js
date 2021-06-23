const express = require("express");
const AIData = require("../models/AIData");
const User = require("../models/User");
const router = express.Router();
AIData.belongsTo(User,{as:"User", foreignKey:"user_info"})

// _______________________________post userinfo___________________
router.post("/", async (req, res) => {
  const { user_info,product_id } = req.body;
  await AIData.create({
    user_info: user_info,
    product_id:product_id,

  })
    .catch((err) => console.log(err));
});
module.exports=router