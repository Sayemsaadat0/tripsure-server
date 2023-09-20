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

const hotelCollection = client.db("tripsureDB").collection("hotels");
router.get('/', async (req, res) => {
    const result = await hotelCollection.find().toArray();
    res.send(result);
})

router.get('/:country', async (req, res) => {
  const country = req.params.country;
  const query = { country: { $regex: country, $options: 'i' } };

  try {
    const result = await hotelCollection.find(query).limit(10).toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching hotels by country:', error);
    res.status(500).send('An error occurred while fetching hotels.');
  }
});

router.post("/", async (req, res) => {
  const newhotels = req.body;
  const result = await hotelCollection.insertOne(newhotels);
  res.send(result);
});


module.exports = router;