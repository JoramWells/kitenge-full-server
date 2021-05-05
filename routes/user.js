const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const saltRounds = 10;
const { getToken } = require("./util.js");

const router = express.Router();

//__________________________register_________________________________
router.post("/register",async (req, res) => {
  const { name, email, password, avatar, phone, address } = req.body;

  await User.findOne({
    where: {
      email: email,
      phone:phone,
    },
  }).then((useremail) => {
    if (!useremail) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        await User.create({
          username: name,
          email: email,
          phone: phone,
          password: hash,
          avatar: avatar,
          address: address,
          // token: token,
        })
          .then((user) => {

              res.send({
                success: true,
                id: user.id,
                role: user.role,
                avatar: user.avatar,
                name: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                token: getToken(user),
              });
            
  
          })
          .catch((err) => res.send({ success: false, err }));
      });

    } else{
      res.send({
        success:false,
        message:"User already exists"
      })
    }
  })



  

});

//_____________________________________login__________________________________________
router.post("/login", async (req, res) => {
  const {email,password} = req.body.email;

  await User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "Email not found",
      });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch)
        res.send({
          success: false,
          message: "Invalid password",
        });
        else{
          res.send({
            success: true,
            id: user.id,
            role: user.role,
            avatar: user.avatar,
            address: user.address,
            phone: user.phone,
            name: user.username,
            email: user.email,
            token: getToken(user),
          })
        }


    });
  });
});



module.exports = router;
