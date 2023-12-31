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
router.get('/:category', async (req, res) => {
    const category = req.params.category;
    const query = {categoryname: {$regex : category,$options:"i"} }
    const result = await categoryCollection.find(query).toArray();
    res.send(result);
})
router.get('/', async (req, res) => {
    const result = await categoryCollection.find().toArray();
    res.send(result);
})



module.exports = router;