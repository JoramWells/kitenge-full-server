const express = require("express");
const AIData = require("../models/AIData");
const Product = require("../models/Product");
const router = express.Router();
AIData.belongsTo(Product, { as: "Product", foreignKey: "productId" });

// _______________________________post userinfo___________________
router.post("/", async (req, res) => {
  const { ipAddr, productId } = req.body;
  await AIData.create({
    ipAddr: ipAddr,
    productId: productId,
  }).catch((err) => console.log(err));
});

router.get("/likes/:id", (req, res) => {
  const id = req.params.id
  AIData.findAndCountAll({
    where:{
      productId:id
    }
  })
    .then((likes) => res.json(likes.count))
    .catch((err) => console.log(err));
});




module.exports = router;
