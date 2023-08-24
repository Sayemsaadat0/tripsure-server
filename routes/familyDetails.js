const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const familyGuideCollection = client.db("tripsureDB").collection("familyGuide");
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await familyGuideCollection.findOne(query)
    res.send(result);
})


module.exports = router;