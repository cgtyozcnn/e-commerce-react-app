const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require("stripe")(
  "sk_test_51HjMU0DcMxJH8WOqv3fxckJ6BfV2KozJT3ZKjubF2rxEKtGKQSLspmSyEFgbR6XtYzdlpI71qtqBfX6kVkJlkWJJ00GFZMf74O"
);

//API

//API config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello word"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request recieved!!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // OK - Created
  response.status(201).send({
      clientSecret : paymentIntent.client_secret
  })
});
//Listen command
exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/e-commerce-fe731/us-central1/api
