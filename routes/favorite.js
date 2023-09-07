const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const favoriteCollection = client.db("tripsureDB").collection("favoriteCollection");

router.post('/', async (req, res) => {
    const favoriteItem = req.body
    const query = {email: favoriteItem.email, hotelId: favoriteItem.hotelId }
    const alreadyFavorited  =await favoriteCollection.findOne(query)
    console.log(query, alreadyFavorited)
    if(alreadyFavorited){
       return res.send({message: "already favorited"})
    }
    // console.log('favorite item', favoriteItem)
    const result = await favoriteCollection.insertOne(favoriteItem)
    res.send(result)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await favoriteCollection.deleteMany(query)
    res.send(result)
})

router.get("/", async (req, res) => {
    const result = await favoriteCollection.find().toArray();
    res.send(result);
});
router.get("/:email", async (req, res) => {
    const email = req.params.email
    const query = {email: email}
    const result = await favoriteCollection.find(query).toArray();
    res.send(result);
});

module.exports = router;
