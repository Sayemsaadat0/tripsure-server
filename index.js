const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.port || 1000;

require("dotenv").config();


// middleware
app.use(cors());
app.use(express.json());













app.get("/", (req, res) => {
    res.send("Data base connected SuccessFully");
  });
  app.listen(port, () => {
    console.log(`Collegy server running on port ${port}`);
  });