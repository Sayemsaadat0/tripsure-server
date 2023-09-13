const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false //true for live, false for sandbox

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const addReviewCollection = client.db("tripsureDB").collection("review");
const paymentCollection = client.db("tripsureDB").collection("payments");

router.post("/", async (req, res) => {
    const trans_id = new ObjectId().toString();
    const tour= req.body;
    console.log(tour);
    
    const data = {
        total_amount: tour?.orderDetails?.price?.totalPrice,
        currency: 'USD',
        tran_id: trans_id, // use unique tran_id for each api call
        success_url: `http://localhost:1000/sll-commerz/payment/success/${trans_id}`,
        fail_url: `http://localhost:1000/sll-commerz/payment/fail/${trans_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url: GatewayPageURL})

       
        
        console.log('Redirecting to: ', GatewayPageURL)
    });
    const finalTourPayment = {
        user: tour?.orderDetails?.email,
        transactionId: trans_id,
        price: tour?.orderDetails?.price?.totalPrice,
        tourId: tour?.orderDetails?.card?._id,
        detailsPrice: tour?.orderDetails?.price,
        selectedDate: tour?.orderDetails?.selectedDate,
        travelerCount: tour?.orderDetails?.travelerCount,
        paidStatus: false,
    }
    const result =  await paymentCollection.insertOne(finalTourPayment); 




    
});
router.post('/payment/success/:transId', async(req, res) => {
    const tranjectionId = req.params.transId
    console.log(tranjectionId); 
    const result = await paymentCollection.updateOne({transactionId: tranjectionId },{
        $set: {
            paidStatus: true
        }
    })
    if (result.modifiedCount > 0) {
        res.redirect(`https://tripsure-client.web.app/payment/success/${tranjectionId}`)
    }
})
router.post('/payment/fail/:transId', async(req, res) => {
    const tranjectionId = req.params.transId
    console.log(tranjectionId); 
    const result = await paymentCollection.deleteOne({transactionId: tranjectionId })
    if (result.deletedCount) {
        res.redirect(`https://tripsure-client.web.app/payment/fail/${tranjectionId}`)
    }
})


module.exports = router;
