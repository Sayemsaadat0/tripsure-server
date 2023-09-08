const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const paymentCollection = client.db("tripsureDB").collection("payments");


router.post('/', async (req, res) => {
    const payment = req.body;
    const result = await paymentCollection.insertOne(payment);
    res.send(result);
    
  })
router.get('/pay', async (req, res) => {
    const result = await paymentCollection.find().toArray();
    res.send(result);
    
  })

  module.exports = router;