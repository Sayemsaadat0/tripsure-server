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


const storyCollection = client.db("tripsureDB").collection("story");

router.get('/', async (req, res)=>{
    const result = await storyCollection.find().toArray()
    res.send(result);
})


router.post('/', async (req, res) => {
    const body = req.body
    const result = await storyCollection.insertOne(body)
    res.send(result)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id : new ObjectId(id)}
    const result = await storyCollection.findOne(query);
    res.send(result);
})



module.exports = router;