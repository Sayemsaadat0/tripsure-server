const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.czarj6h.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const usersCollection = client.db("tripsureDB").collection("users");

router.put('/:email', async (req, res) => {
  const email = req.params.email
  const userData = req.body
  const query = { email: email }
  const options = { upsert: true }
  const updateDoc = {
    $set: userData
  }
  const result = await usersCollection.updateOne(query, updateDoc, options)
  res.send(result)
})

router.get('/', async (req, res) => {
  const result = await usersCollection.find().toArray()
  res.send(result)
})

router.get('/:email', async (req, res) => {
  const email = req.params.email
  const filter = { email: email }
  const result = await usersCollection.findOne(filter)
  res.send(result)
})

// add cover photo from user profile
router.patch('/:email', async (req, res) => {
  const email = req.params.email
  const coverPhoto = req.body
  const query = { email: email }
  const updateDoc = {
    $set: {
      coverPhoto: coverPhoto.coverPhoto
    }
  }
  const result = await usersCollection.updateOne(query, updateDoc)
  res.send(result)
})

// update user data from user profile
router.put('/:email', async (req, res) => {
  const email = req.params.email
  const body = req.body
  const query = { email: email }
  const updateDoc = {
    $set: {
      phone: body.phone,
      gender: body.gender,
      country: body.country
    }
  }
  const result = await usersCollection.updateOne(query, updateDoc)
  res.send(result)

})





// role admin // eivabe instructor korbo
router.get('/:email', async (req, res) => {
  const email = req.params.email;

  const query = { email: email }
  const user = await usersCollection.findOne(query);
  const result = { admin: user?.role === 'admin' }
  res.send(result);
})

// instructor
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email }
  const user = await usersCollection.findOne(query);
  const result = { operator: user?.role === 'operator' }
  res.send(result);
})



// router.patch('/:id', async (req, res) => {
//   const id = req.params.id;
//   const filter = { _id: new ObjectId(id) };
//   console.log('make admin', id, filter)
//   const updateDoc = {
//     $set: {
//       role: 'admin'
//     },
//   };

//   const result = await usersCollection.updateOne(filter, updateDoc);
//   res.send(result);
// })

router.put('/updateRole/:id', async (req, res) => {
  const id = req.params.id
  const role = req.body
  console.log(role)
  const filter = { _id: new ObjectId(id) }
  const updateDoc = {
    $set: {
      role: role.role
    }
  }
  const result = await usersCollection.updateOne(filter, updateDoc)
  res.send(result)
})


// operator
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: 'operator'
    },
  };

  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);

})

router.get("/", async (req, res) => {
  const searchTerm = req.query.email;
  console.log(searchTerm)

  const query = searchTerm
    ? {
      email: { $regex: searchTerm, $options: "i" },
    }
    : {};
  const result = await usersCollection.find(query).toArray();
  res.send(result);
});



router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const query = { _id: new ObjectId(id) }
  const result = await usersCollection.deleteOne(query)
  res.send(result)
})

module.exports = router;