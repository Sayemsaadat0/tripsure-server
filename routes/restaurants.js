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

const resturantsCollection = client.db("tripsureDB").collection("restaurant");
router.get("/", async (req, res) => {
    const result = await resturantsCollection.find().toArray();
    res.send(result);
  });
  router.post("/", async (req, res) => {
    const newresturants = req.body;
   
    const result = await resturantsCollection.insertOne(newresturants);
    res.send(result);
  });


module.exports = router;