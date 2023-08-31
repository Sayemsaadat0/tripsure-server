const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const userCollection = client.db("tripsureDB").collection("users");
const packagesCollection = client.db("tripsureDB").collection("packages");

router.get('/', async (req, res) => {
    const result = await packagesCollection.find().toArray();
    res.send(result);
})
router.put('/:email', async (req, res) => {
    const { packageId } = req.body;
    const email = req.params.email;
    const filter = { email: email };


    const user = await userCollection.findOne(filter);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.favoritePackageIds && user.favoritePackageIds.includes(packageId)) {
        return res.status(400).json({ message: 'Package ID already exists in favorites' });
    }

    const updateDoc = {
        $push: {
            favoritePackageIds: packageId,
        },
    };

    try {
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






module.exports = router;