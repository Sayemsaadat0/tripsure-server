const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;




const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const categoryCollection = client.db("tripsureDB").collection("hotels");


router.get('/', async (req, res) => {
    const result = await categoryCollection.find().toArray();
    res.send(result);
})
router.post("/", async (req, res) => {
  const newhotels = req.body;
  const result = await categoryCollection.insertOne(newhotels);
  res.send(result);
});


module.exports = router;