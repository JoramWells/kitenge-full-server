const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

//order routes
router.get("/orders",async (req, res) => {
  await Order.findAll({})
    .then((items) => res.send(items))
    .catch((err) => console.log(err));
});

module.exports = router;
