const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.port || 1000;

require("dotenv").config();

//router here
const categoryRoute = require("./routes/category");
const tourDetails = require("./routes/tourDetails");
const topDestinations = require("./routes/TopDestination");
const allHotels = require("./routes/hotels");
const allresturants = require('./routes/restaurants')
const searchAllDatas = require('./routes/searchResult')
const users = require('./routes/users')

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
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
    app.use('/dashboard/addhotels',allHotels);
    app.use('/dashboard/addresturants', allresturants);
    app.use("/searchResult", searchAllDatas);
    app.use("/users", users)


 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "connected to MongoDB!"
    );
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
