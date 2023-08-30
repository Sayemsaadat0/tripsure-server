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

const resturantsCollection = client.db("tripsureDB").collection("restaurant");
const hotelsCollection = client.db("tripsureDB").collection("hotels");
const categoryCollection = client.db("tripsureDB").collection("category");

router.get("/", async (req, res) => {
  const result = await resturantsCollection.find().toArray();
  res.send(result);
});

//get individual data of search
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantsResult = await resturantsCollection.find().toArray();
  const hotelsResult = await hotelsCollection.find().toArray();
  const countriesResult = await categoryCollection.find().toArray();
  const combineResults = [
    ...restaurantsResult,
    ...hotelsResult,
    ...countriesResult,
  ];
  const selectedCard = combineResults.find((data) => data._id.toString() == id);
  console.log(selectedCard);
  return res.send(selectedCard);
});

router.get("/:category/:searchText", async (req, res) => {
  const searchText = req.params.searchText;
  const category = req.params.category;
  if (category === "hotels") {
    const query = searchText ? {
          hotelName: { $regex: new RegExp(searchText, "i") },
        } : {};
    const result = await hotelsCollection.find(query).toArray();
    return res.send(result);
  } else if (category === "restaurants") {
    const query = searchText ? {
          title: { $regex: new RegExp(searchText, "i") },
        }
      : {};
    const result = await resturantsCollection.find(query).toArray();
    return res.send(result);
  } else if (category === "search-all") {
    const query = searchText
      ? {
          $or: [
            { title: { $regex: new RegExp(searchText, "i") } },
            { hotelName: { $regex: new RegExp(searchText, "i") } },
            { country: { $regex: new RegExp(searchText, "i") } },
          ],
        }
      : {};
    const resturantsResult = await resturantsCollection.find(query).toArray();
    const hotelsResult = await hotelsCollection.find(query).toArray();
    const countriesResult = await categoryCollection.find(query).toArray();
    const combineResults = [
      ...resturantsResult,
      ...hotelsResult,
      ...countriesResult,
    ];
    return res.send(combineResults);
  } else {
    return res.send([]);
  }
});

module.exports = router;
