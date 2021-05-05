const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.get("/orders", (req, res) => {
  Order.findAll({})
    .then((items) => res.send(items))
    .catch((err) => console.log(err));
});

module.exports = router;
