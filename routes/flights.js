const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const flightsCollection = client.db("tripsureDB").collection("flightsCollection");


router.post("/", async (req, res) => {
    const newPost = req.body;
    const result = await flightsCollection.insertOne(newPost);
    res.send(result);
   
  });
  
  
  router.get("/", async (req, res) => {
    const result = await flightsCollection.find().toArray();
    res.send(result);
  });

module.exports = router;
