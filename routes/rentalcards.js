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

const rentalCardsCollection = client.db("tripsureDB").collection("rentalcars");

router.get("/singleCar:/id", async (req, res) => {
  const id = req.params.id;
  const query = { _id : new ObjectId(id)}
  const result = await rentalCardsCollection.findOne(query);
  res.send(result);
})

router.get('/', async (req, res) => {
    const result = await rentalCardsCollection.find().toArray();
    res.send(result);
})
router.get('/forpayment', async (req, res) => {
  const id = req.query.id; 
  console.log(id);
  const result = await rentalCardsCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

router.get('/search', async (req, res) => {
  const { location, pickUpDate,dropOffDate, unavailableDate } = req.query;
  console.log(location, pickUpDate,dropOffDate, unavailableDate);

  const dbQuery = {
      $and: [
        {
          $or: [
            { pickup_location: { $regex: location, $options: 'i' } },
            { pickup_date: { $regex: pickUpDate, $options: 'i' } },
            { dropoff_date: { $regex: dropOffDate, $options: 'i' } },
          ]
        },
        {
          
          unavailable_dates: { $nin: [unavailableDate] }
        }
      ]
    };

  if (!rentalCardsCollection) {
    return res.status(500).json({ error: 'Database not connected' });
  }

  try {
    const searchResults = await rentalCardsCollection.find(dbQuery).toArray();
    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;