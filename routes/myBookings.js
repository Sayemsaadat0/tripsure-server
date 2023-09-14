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

const bookingCollection = client.db("tripsureDB").collection("payments");

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const query = { user: email };
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
});

module.exports = router;
