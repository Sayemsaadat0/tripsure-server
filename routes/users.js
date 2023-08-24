const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.czarj6h.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const usersCollection = client.db("tripsureDB").collection("users");

router.put('/:email',async (req, res) => {
  const email = req.params.email
  const userData = req.body
  const query = {email : email}
  const options = {upsert: true}
  const updateDoc = {
    $set: userData
  }
  const result = await usersCollection.updateOne(query, updateDoc, options)
  res.send(result)
  console.log(result)
})

router.get('/', async(req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
})

router.delete('/:id',async(req,res) =>{
  const id = req.params.id
  console.log(id)
  const query = {_id: new ObjectId(id)}
  const result = await usersCollection.deleteOne(query)
  res.send(result)
})

module.exports = router;