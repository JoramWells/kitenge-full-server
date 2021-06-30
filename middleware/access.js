require("dotenv").config();
const axios = require("axios");
const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const access = async (req, res, next) => {
  let buff = Buffer.from(
    process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET
  );
  let auth = buff.toString("base64");
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==",
      },
    });
    console.log(data.access_token);
    req.access_token = data.access_token;
    next();
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = access;

// let headers = new Headers();
// headers.append("Authorization", "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==");
// fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers })
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log(error));