const express = require('express');
// const router = require('./router');

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

const usersCollection = client.db("tripsureDB").collection("users");

// Import the code you want to test
const router = require('../routes/users');

// Create a test suite
describe('Users Router',  () => {

  // Create a beforeEach hook to initialize the database
  beforeEach(() => {
    client.connect();
    usersCollection.deleteMany({});
  });

  // Create an afterEach hook to close the database connection
  afterEach(() => {
    client.close();
  });

  // Write your unit tests here

  it('should return the user document for a valid email address', async () => {
    const email = 'test@example.com';
    const user = { email, name: 'Test User' };
    usersCollection.insertOne(user);

    const result = await router.get('/' + email);

    expect(result).toEqual(user);
  });

  it('should return undefined for an invalid email address', async () => {
    const email = 'invalid@email.com';

    const result = await router.get('/' + email);

    expect(result).toBeUndefined();
  });
});