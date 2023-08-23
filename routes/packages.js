const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const packageCollection = client.db("tripsureDB").collection("packages");

router.get('/', async (req, res) => {
    const result = await packageCollection.find().toArray();
    res.send(result);
})
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await packageCollection.findOne(query);
  res.send(result);
})




module.exports = router;