const axios = require("axios");
require('dotenv').config()

const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const access = async (req, res, next) => {
  let buff = Buffer.from(process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET);
  let auth = buff.toString("base64");
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Basic " + auth,
    },
  });
  console.log(data.access_token);
  req.access_token = data.access_token;
  next();
  return data.access_token;
};

module.exports = access;
