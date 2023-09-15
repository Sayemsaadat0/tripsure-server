const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


router.post('/', async (req, res) => {
    const {price} =req.body;
    const amount = price * 100 ;
    console.log(price, amount);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    })
    res.send({
        client_secret: paymentIntent.client_secret,
    })

})


module.exports = router;