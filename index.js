const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.port || 1000;

require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

//router here
const categoryRoute = require("./routes/category");
const tourDetails = require("./routes/tourDetails");
const topDestinations = require("./routes/TopDestination");
const allHotels = require("./routes/hotels");
const allpackges = require('./routes/packages')
const users = require('./routes/users')
const tourCountry = require("./routes/tourCountry")
const restaurant = require("./routes/restaurant")
const dothingsAttractionReviews = require("./routes/doThingsAttractionReviews")
const stayThingsAttractionReviews = require("./routes/stayThingsAttractionReviews")
const restaurantAttractionReviews = require("./routes/restaurantAttractionReviews")
const packages = require("./routes/packages")
const travelDeals = require("./routes/TravelDeals")
const allFamilyGuide = require("./routes/AllFamilyGuide")
const familyDetails = require("./routes/familyDetails")
const addToFavoritePackage = require("./routes/AddToFavoritePackage")
const getFavoritePackage = require("./routes/getFavoritePackageData")
const stripe = require("./routes/stripe")
const payments = require("./routes/payments")
const flights = require("./routes/flights")




const addReview = require("./routes/addReview");
const postStory = require("./routes/postStory");
const userguides = require("./routes/guides")
const allresturants = require('./routes/restaurants')
const searchAllDatas = require('./routes/searchResult')
const story = require ('./routes/story')

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    //  work on

    //from routes
    app.use("/category", categoryRoute);
    app.use("/tourDetails", tourDetails);
    app.use("/top-destinations", topDestinations);
    app.use("/all-hotels", topDestinations);
    app.use("/dashboard/addhotels", allHotels);
    app.use('/showallhotels',allHotels)
    app.use("/dashboard/addresturants", allresturants);
    app.use("/dashboard/packages", allpackges);
    app.use("/users", users);
    app.use("/users/admin", users);
    app.use("/users/operator", users);
    app.use('/users/search',users)
    // app.use("/category", categoryRoute);
    // app.use("/tourDetails", tourDetails);
    // app.use("/top-destinations", topDestinations);
    app.use("/all-hotels", allHotels);
    app.use("/tourCountry", tourCountry);
    app.use("/restaurant", restaurant);
    app.use("/doThingsAttractionReviews", dothingsAttractionReviews);
    app.use("/stayThingsAttractionReviews", stayThingsAttractionReviews);
    app.use("/restaurantAttractionReviews", restaurantAttractionReviews);
    app.use("/packages", packages);
    app.use("/travelDeals", travelDeals);
    app.use("/allFamilyGuide", allFamilyGuide);
    app.use("/familyDetails", familyDetails);
    app.use("/addToFavoritePackage", addToFavoritePackage);
    app.use("/getFavoritePackage", getFavoritePackage);
    app.use("/addReview", addReview);
    app.use("/postStory", postStory);
    app.use("/addguide", userguides)
    app.use("/allguide", userguides)
    app.use("/stripe-payment-intent", stripe);
    app.use("/payments", payments);
    app.use("/flights", flights);
  











    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Data base connected SuccessFully");
});
app.listen(port, () => {
  console.log(`tripsure server running on port ${port}`);
});
