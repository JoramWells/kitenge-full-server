const axios = require("axios");
const express = require("express");
const router = express.Router();

const url = "https://nancy1237.herokuapp.com";
const auth = "Token 8c7639ab180ad2e323e200f8019b9a55df8ae2f1";

const DEV_URL = "http://127.0.0.1:8000"
const AUTH_TOKEN = "Token 1c461b9d2c5e6475fd2da577bb8e5b70f2795fe5"

router.post("/search", async (req, res) => {
    console.log(process.argv[2] || 'development')
    console.log("wtf")
  try {
    await axios
      .post(`${url}/product/search`, req.body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((err) => res.send(err.message));
  } catch (error) {
    return
  }
});

router.get("/recent", async (req, res) => {
  await axios
    .get(`${url}/recent/search`, {
      headers: {
        Authorization: auth,
      },
    })
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

module.exports = router;
