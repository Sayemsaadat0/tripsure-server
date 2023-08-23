const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.port || 1000;

require("dotenv").config();

//router here
const categoryRoute = require("./routes/category")
const tourDetails = require("./routes/tourDetails")
const topDestinations = require("./routes/TopDestination")
const allHotels = require("./routes/hotels")
const tourCountry = require("./routes/tourCountry")
const restaurant = require("./routes/restaurant")
const dothingsAttractionReviews = require("./routes/doThingsAttractionReviews")
const stayThingsAttractionReviews = require("./routes/stayThingsAttractionReviews")
const restaurantAttractionReviews = require("./routes/restaurantAttractionReviews")
const packages = require("./routes/packages")
const travelDeals = require("./routes/TravelDeals")
const allFamilyGuide = require("./routes/AllFamilyGuide")
const familyDetails = require("./routes/familyDetails")






// middleware
app.use(cors());
app.use(express.json());








const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();
    //  work on

    //from routes
    app.use("/category",categoryRoute);
    app.use("/tourDetails",tourDetails);
    app.use("/top-destinations",topDestinations)
    app.use("/all-hotels",allHotels)
    app.use("/tourCountry",tourCountry)
    app.use("/restaurant",restaurant)
    app.use("/doThingsAttractionReviews",dothingsAttractionReviews)
    app.use("/stayThingsAttractionReviews",stayThingsAttractionReviews)
    app.use("/restaurantAttractionReviews",restaurantAttractionReviews)
    app.use("/packages",packages)
    app.use("/travelDeals",travelDeals)
    app.use("/allFamilyGuide",allFamilyGuide)
    app.use("/familyDetails",familyDetails)
   


























    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("Data base connected SuccessFully");
  });
  app.listen(port, () => {
    console.log(`tripsure server running on port ${port}`);
  });