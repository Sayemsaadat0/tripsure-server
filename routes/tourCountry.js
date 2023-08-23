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

const categoryCollection = client.db("tripsureDB").collection("category");


router.get('/:country', async (req, res) => {
    const country = req.params.country;
    const query = {country: {$regex : country,$options:"i"} }
    const result = await categoryCollection.find(query).limit(10).toArray();
    res.send(result);
  })

  module.exports = router;