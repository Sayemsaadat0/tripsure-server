const express = require("express");
const router = express.Router();
const morgan = require("morgan");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const destinationCollection = client
  .db("tripsureDB")
  .collection("destinations");

router.get("/", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const query = {
    title: { $regex: new RegExp(searchTerm, "i") },
  };
  console.log(query);
  const result = await destinationCollection.find(query).toArray();
  res.send(result);
});



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await destinationCollection.findOne(query);
  res.send(result);
});
router.get("/", async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
});

module.exports = router;
