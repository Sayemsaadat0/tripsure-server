const chai = require('chai');
const chaiHttp = require('chai-http');
const hotels = require('../index'); // Import your Express hotels (assuming index.js is your main server file)
const expect = chai.expect;

chai.use(chaiHttp);

describe('Hotel Router', () => {
  // This test assumes that the /hotels endpoint returns an array of hotels
  it('should get a list of hotels', (done) => {
    chai.request(hotels)
      .get('/all-hotels')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // This test assumes that the /hotels/:countryName endpoint returns hotels filtered by country
  it('should get hotels filtered by country', (done) => {
    const countryName = 'YourCountry'; // Replace with an actual country name
    chai.request(hotels)
      .get(`/all-hotels/${countryName}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Add more assertions to validate the response based on your requirements
        done();
      });
  });

  // This test assumes that the /hotels endpoint can create a new hotel
  it('should create a new hotel', (done) => {
    const newHotel = {
      name: 'New Hotel',
      country: 'New Country',
      // Add other required fields here
    };
    chai.request(hotels)
      .post('/all-hotels')
      .send(newHotel)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('insertedId');
        done();
      });
  });
});
