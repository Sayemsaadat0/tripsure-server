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

const guideCollection = client.db("tripsureDB").collection("guides");

router.get('/', async (req, res) => {
    const result = await guideCollection.find().toArray();
    res.send(result);
})
// router.get('/:countryName', async (req, res) => {
//     const countryName = req.params.countryName;
//     const query = {country: {$regex : countryName,$options:"i"} }
//     const result = await guideCollection.find(query).limit(10).toArray();
//     res.send(result);
// })
router.post("/", async (req, res) => {
  const newguide = req.body;
  console.log(newguide)
  const result = await guideCollection.insertOne(newguide);
  res.send(result);
});


module.exports = router;