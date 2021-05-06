require('dotenv').config()
const express = require("express");
const axios = require("axios");
const dateFormat = require('dateformat')

const router = express.Router()
const access = require("../middleware/access");

router.get("/access_token", access, (req, res) => {
  console.log(req.access_token);
  res.end();
});


//Register  mpesa user
router.get("/register", access, async (req, res) => {
  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  let auth = req.access_token;
  const data = JSON.stringify({
    ShortCode: "600383",
    ResponseType: "Complete",
    ConfirmationURL: "http://192.168.0.29:5000/confirmation",
    ValidationURL: "http://192.168.0.29:5000/validation_url",
  });
  await axios
    .post(url, data, {
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});


//stk_push
router.post("/stk", access, async (req, res) => {
  const {phone,amount} = req.body;
  const phone1 = phone.substr(1);
  const phone2 = phone1.replace(/\s/g, "");
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + req.access_token;
  let date = new Date();
  const timestamp = dateFormat(date,"yyyymmddhhmmss")
  console.log(timestamp);
  let buff = Buffer.from(
    process.env.BUSINNESS_SHORT_CODE +
      process.env.PASS_KEY +
      timestamp
  );
  const password = buff.toString("base64");

  const data = JSON.stringify({
    BusinessShortCode: process.env.BUSINNESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: "254716437799",
    PartyB: "174379",
    PhoneNumber: phone2,
    CallBackURL: "http://192.168.0.29:5000/callback",
    AccountReference: "Test",
    TransactionDesc: "TestPay",
  });
  try {
    const response = await axios
    .post(url, data, {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    })
    res.send(response.data)
    
  } catch (error) {
    res.send(error.response.data)
    console.log(error.response.data)
    
  }

});


//M-PESA callback
router.post("/callback", async (req, res) => {
  console.log("data");
  if (req.body.Body.stkCallback.CallbackMetadata) {
    await Order.create({
      amount: req.body.Body.stkCallback.CallbackMetadata.Item[0].Value,
      receipt: req.body.Body.stkCallback.CallbackMetadata.Item[1].Value,
      phone: req.body.Body.stkCallback.CallbackMetadata.Item[3].Value,
      date: req.body.Body.stkCallback.CallbackMetadata.Item[2].Value,
    })
      .then((item) => res.send(item))
      .catch((err) => console.log(err));
  }
});


router.post("/query", access, async (req, res) => {
  const { requestID } = req.body;
  console.log(requestID);
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    auth = "Bearer " + req.access_token;
  let date = new Date();
  const timestamp = dateFormat(date, "yyyymmddhhmmss");
  let buff = Buffer.from(
    process.env.BUSINNESS_SHORT_CODE +
      process.env.PASS_KEY +
      timestamp
  );
  const password = buff.toString("base64");
  const data = JSON.stringify({
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: requestID,
  });
  await axios
    .post(url, data, {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      if (err.data) {
        res.send(err.data);
      }
      console.log(err);
    });
});
module.exports = router;
