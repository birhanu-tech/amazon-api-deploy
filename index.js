
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express(); // create express app instance for this functions module
app.use(cors({ origin: true })); // allow cors request from client app

app.use(express.json()); // for parsing application/json request body

app.get("/", (req, res) => {
  // get request handler for home route
  res.status(200).json({
    message: "success !",
  });
});

app.post("/payment/create", async (req, res) => {
  // post request handler for payment route
  const total = req.query.total;

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd", // EUR, USD, INR etc.
    });
    console.log(paymentIntent);
    // console.log("payment received", total);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret, // client secret for payment
      // paymentIntent
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

app.listen(5000, (err)=> {
    if(err) throw err;
    console.log("amazon server running on port: 5000, http://localhost:5000");
})
//exports.api = onRequest(app); // return express app instance for use in firebase functions
