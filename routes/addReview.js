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

const addReviewCollection = client.db("tripsureDB").collection("review");

router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const review = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: review,
  };
  const result = await addReviewCollection.updateOne(
    filter,
    updateDoc,
    options
  );
  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await addReviewCollection.find().toArray();
  res.send(result);
});

module.exports = router;