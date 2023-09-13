const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express'); // Import Express directly
const expect = chai.expect;

chai.use(chaiHttp);

// Create an instance of Express app
const app = express();

// Import your routes here
const usersRouter = require('../routes/users');

// Mount your routes
app.use('/users', usersRouter);

describe('Users Router', () => {
  // This test assumes that the /users endpoint returns an array of users
  it('should get a list of users', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // This test assumes that the /users/:email endpoint returns a user by email
  it('should get a user by email', (done) => {
    const userEmail = 'pj.parvaz45@gmail.com'; // Replace with an actual email
    chai.request(app)
      .get(`/users/${userEmail}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.equal(userEmail); // Validate the email if needed
        // Add more assertions to validate the response based on your requirements
        done();
      });
  });

  // This test assumes that the /users endpoint can create a new user
  it('should create a new user', (done) => {
    const newUser = {
      email: 'newuser@example.com',
      // Add other required fields here
    };
    chai.request(app)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('insertedId');
        done();
      });
  });

  // Add more tests for other routes in your users.js module as needed

  // Make sure to handle error cases and edge cases in your tests
});
