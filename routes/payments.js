const express = require('express');
const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');
const router = express.Router();

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


//send confirmation email
const auth = {
  auth: {
    api_key: process.env.private_api_key,
    domain: process.env.email_domain
  }
}

const transporter = nodemailer.createTransport(mg(auth));

const sendConfirmationEmail = payment =>{
  transporter.sendMail({
    from: "alhabib5565@gmail.com", // verified sender email
    to: "alhabib5565@gmail.com", // recipient email
    subject: "Your Order is confirmed,Enjoy the Travel", // Subject line
    text: "Hello world!", // plain text body
    html: `
    <div>
      <h2>Order Confirmed</h2>
      <h4>Your Transaction ID: ${payment.transactionId}</h4>
      <h4>Price: ${payment.price}</h4>
      <h4>Date: ${payment.selectedDate}</h4>

    </div>
    `, // html body
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 
}

const paymentCollection = client.db("tripsureDB").collection("payments");


router.post('/', async (req, res) => {
    const payment = req.body;
    const result = await paymentCollection.insertOne(payment);
    sendConfirmationEmail(payment)
    res.send(result);
    
  })
router.get('/pay', async (req, res) => {
    const result = await paymentCollection.find().toArray();
    res.send(result);
    
  })

  module.exports = router;