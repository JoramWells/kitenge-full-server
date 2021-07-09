require("dotenv").config("../.env");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const marked = require("marked");
const webp = require("webp-converter");
const sharp = require("sharp");
const { JSDOM } = require("jsdom");
const createDomPurify = require("dompurify");
const dompurify = createDomPurify(new JSDOM().window);
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
webp.grant_permission();

Product.belongsTo(User, { as: "User", foreignKey: "userId" });

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: async (req, file, cb) => {
    const ext = file.originalname.slice(0, file.originalname.lastIndexOf("."));
    const filename = "./images/" + ext + ".webp";
    console.log(ext);
    cb(null, file.originalname);
    await webp
      .cwebp(
        "./uploads/" + file.originalname,
        filename,
        "-q 90",
        (logging = "-v")
      )
      .then(async (response) => {
        console.log(response);
        await sharp(filename)
          .resize(750, 550)
          .toFile("./uploads/" + ext + ".webp")
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
});

const upload = multer({
  storage: storage,
}).fields([{ name: "file", maxCount: 1 }]);

//____________________upload route_________________________
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    else res.end();
  });
});

//____________________product routes__________________________
//_________________find all products___________________________

router.get("/products", (req, res) => {
  const { page, size } = req.query;
  Product.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    // limit: parseInt(req.query.size),
    // offset: parseInt(req.query.size * req.query.page),
  })
    .then((products) => {
      res.send(products.rows);
    })
    .catch((err) => console.log(err));
});

// router.post("/products", (req, res) => {

//     const subscription = req.body
//     const payload = JSON.stringify({title:'Hey there'})
//     webpush.sendNotification(subscription, payload).catch(err=>console.log(err))
//     console.log(subscription)

// });

//_____________________ADD PRODUCT_________________________
router.post("/productz/add", async (req, res) => {
  const description = req.body.description;
  const markedDown = dompurify.sanitize(marked(description));
  await Product.create({
    product_name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    selling_price: req.body.selling_price,
    image: req.body.image,
    description: markedDown,
    category: req.body.category,
    userId: req.body.userId,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

//_____________________edit product_________________________
router.put("/product/add/:id", async (req, res) => {
  const { name, price, stock, image, ratings, category, description, likes } =
    req.body;
  const markedDown = dompurify.sanitize(marked(description));
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  console.log(product.id);
  await Product.update(
    {
      product_name: name,
      price: price,
      stock: stock,
      image: image,
      ratings: ratings,
      category: category,
      description: markedDown,
      likes: likes,
    },
    { where: { id: product.id } }
  )
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.put("/product/likes/:id", async (req, res) => {
  const { likes } = req.body;
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  console.log(product.id);
  await Product.update({ likes: likes }, { where: { id: product.id } })
    .then(async (response) => {
      const updated = await Product.findByPk(productId);

      console.log(updated.likes);
      res.json(updated.likes);
    })
    .catch((err) => console.log(err));
});

//_______________get category route_____________________
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const product = await Product.findAll({
    where: {
      category: category,
    },
  });
  res.send(product);
});

//______________find all categories___________________
router.get("/allcategory", (req, res) => {
  Category.findAll({ order: [["updatedAt", "DESC"]] })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => console.log(err));
});

router.post("/post", (req, res) => {
  const { category } = req.body;

  Product.findAll({
    where: {
      category: category,
    },
  }).then((product) => {
    if (!product) {
      return res.json({
        found: false,
        message: "Product not found",
      });
    }
    return res.json({
      product: product,
    });
  });
});

//_________find a product with unique id____________
router.get(`/product/:id`, async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.json({
      productFound: false,
      message: "Product not found",
    });
  }
  return res.send(product);
});

//_______________delete a certain product________________
router.delete("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  //   Product.destroy({
  //     where: {
  //       id: id,
  //     },
  //   }).then(
  //     res
  //       .send({
  //         success: true,
  //       })
  //       .catch((error) => console.log(error))
  //   );
  res.end();
});

module.exports = router;
