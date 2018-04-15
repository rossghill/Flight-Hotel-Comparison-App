const assert = require('assert');
const FlightHotelPackage = require('../flightHotelPackage');
const Hotel = require('../hotelEntity');
const FlightPackage = require('../flightPackage')

describe('Flight Hotel Package', function(){

  let fhp;

  beforeEach(function(){

    const outboundFlights = {"origin": "LAX",
    "destination": "LON",
    "departureTime": "2018-03-16T12:50",
    "arrivalTime": "2018-03-16T17:10"};
    const inboundFlights = {"origin": "LON",
    "destination": "LAX",
    "departureDate": "2018-05-23T00:00",
    "arrivalTime": "2018-05-24T09:00"}
    const flightPrice = 900;
    const flightPackage = new FlightPackage(outboundFlights, inboundFlights, flightPrice);

    const hotelDetails = {
      "hotelName": "Hotel California",
      "price": 249.99,
      "currency": "USD",
      "amenities": ["POOL", "RESTAURANT", "WI-FI"],
      "description": "You can check in any time you like, but you can never leave",
      "smallImage": "http://bxit.ly/2oLQcwQ",
      "bigImage": "http://bxit.ly/1T09dWo",
      "starRating": 5,
      "latitude": 666.666,
      "longitude": 777.777,
    }
    const hotel = new Hotel(hotelDetails);

    const packagePrice = hotel.hotelPrice + flightPackage.flightPrice;

    fhp = new FlightHotelPackage(flightPackage, hotel, packagePrice);
  });

  it('should have a flight package', function(){
    actual = fhp.flightPackage.flightPrice;
    assert.strictEqual(actual, 900);
  });

  it('should have a hotel', function(){
    actual = fhp.hotel.hotelName;
    assert.strictEqual(actual, "Hotel California")
  });

  it('should have a package price', function(){
    actual = fhp.packagePrice;
    assert.strictEqual(actual, 1149.99);
  });


});
