const axios = require("axios");

const consumer_key = "GFLaeINfznCZgALQ2IlDjrQ8rqtUkfll";
const consumer_secret = "X5ejdUNKIAUeHN6m";
const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const access = async (req, res, next) => {
  let buff = Buffer.from(consumer_key + ":" + consumer_secret);
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
