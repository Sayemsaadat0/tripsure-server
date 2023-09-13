const express = require("express");
const router = express.Router();


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const categoryCollection = client.db("tripsureDB").collection("category");
router.get("/", async (req, res) => {
  const result = await categoryCollection
    .find()
    .sort({ visitcount: 1 })
    .limit(10)
    .toArray();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return 'id  not found'
    }
    const query =  { _id: new ObjectId(id) }; 
    const result = await categoryCollection.findOne(query);
    res.status(200).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Internal server error" }); 
  }
});

module.exports = router;
