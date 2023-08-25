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

router.get('/:email/favorite-packages', async (req, res) => {
    const email = req.params.email;
    const filter = { email: email };

    try {
        const user = await userCollection.findOne(filter);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favoritePackageIds = user.favoritePackageIds || [];
   
        const favoritePackages = await packagesCollection.find({
            _id: { $in: favoritePackageIds.map(id => new ObjectId(id)) }
        }).toArray();

        res.send(favoritePackages);
    } catch (error) {
        console.error('Error retrieving favorite packages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});








module.exports = router;