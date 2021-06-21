const express = require("express");
const AIData = require("../models/AIData");
const router = express.Router();

// _______________________________post userinfo___________________
router.post("/", async (req, res) => {
  const { user_info,product_id,start_time, stop_time } = req.body;
  await AIData.create({
    user_info: user_info,
    product_id:product_id,
    start_time: start_time,
    stop_time: stop_time,
  })
    .catch((err) => console.log(err));
});
module.exports=router