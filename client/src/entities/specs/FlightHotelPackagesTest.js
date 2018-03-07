const assert = require('assert');
const flightHotelPackage = require('../flightHotelPackage');
const Hotel = require('../hotelEntity');


describe('* Flight Hotel Packages *', function() {

let fhps

beforeEach(function() {

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
    "hotelPrice": 249.99,
    "currency": "USD",
    "amenities": ["POOL", "RESTAURANT", "WI-FI"],
    "description": "You can check in any time you like, but you can never leave",
    "smallImage": "http://bxit.ly/2oLQcwQ",
    "bigImage": "http://bxit.ly/1T09dWo",
    "starRating": 5,
    "latitude": 666.666,
    "longitude": 777.777,
  }

  const hotelDetails2 = {
    "hotelName": "Cats Hotel",
    "hotelPrice": 49.99,
    "currency": "USD",
    "amenities": ["RESTAURANT", "WI-FI"],
    "description": "The only hotel owned and operated by cats",
    "smallImage": "http://www.styletails.com/wp-content/uploads/2016/06/VAC_china_luxury_cat_hotel.jpg",
    "bigImage": "http://www.styletails.com/wp-content/uploads/2016/06/VAC_china_luxury_cat_hotel.jpg",
    "starRating": 1,
    "latitude": 345.678,
    "longitude": 123.456,
  }

  const hotel1 = new Hotel(hotelDetails);
  const hotel2 = new Hotel(hotelDetails2);

  const packagePrice = hotel1.hotelPrice + flightPackage.flightPrice;
  const packagePrice2 = hotel2.hotelPrice + flightPackage.flightPrice;

  fhp = new FlightHotelPackage(flightPackage, hotel1, packagePrice);
  fhp2 = new FlightHotelPackage(flightPackage, hotel2, packagePrice2);

  fhpsArray = [fhp, fhp2];


  fhps = new FlightHotelPackages(fhpsArray, flightPackage);

});

it('Flight hotel packages should have an array of flight hotel packages', function() {
  const actual = 
})

})
