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

const restaurantCollection = client.db("tripsureDB").collection("restaurant");


router.get('/', async (req, res) => {
    const result = await restaurantCollection.find().toArray();
    res.send(result);
})
router.get('/:countryName', async (req, res) => {
    const country = req.params.countryName;
    const query = {'address.country': {$regex : country,$options:"i"} }
    const result = await restaurantCollection.find(query).toArray();
    res.send(result);
})



module.exports = router;