// test/paymentRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your Express app

const expect = chai.expect;

chai.use(chaiHttp);

describe('Payment Routes', () => {
  it('should insert payment data with POST /', (done) => {
    chai.request(app)
      .post('/payment') // Assuming your route is '/payment' for inserting data
      .send({ /* Your payment data here */ })
      .end((err, res) => {
        expect(res).to.have.status(200); // Adjust the status code as needed
        expect(res.body).to.have.property(/* Property you expect */);
        // Add more assertions as needed
        done();
      });
  });

  it('should retrieve payment data with GET /pay', (done) => {
    chai.request(app)
      .get('/payment/pay') // Adjust the route as needed
      .end((err, res) => {
        expect(res).to.have.status(200); // Adjust the status code as needed
        expect(res.body).to.be.an('array'); // Assuming it returns an array
        // Add more assertions as needed
        done();
      });
  });

  it('should retrieve payment data with GET /', (done) => {
    chai.request(app)
      .get('/payment') // Adjust the route as needed
      .end((err, res) => {
        expect(res).to.have.status(200); // Adjust the status code as needed
        expect(res.body).to.be.an('array'); // Assuming it returns an array
        // Add more assertions as needed
        done();
      });
  });
});
