const assert = require('assert');
const Hotel = require('../hotelEntity');

describe('Hotel', function(){

let hotel1;

beforeEach(function(){
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
  hotel1 = new Hotel(hotelDetails);
});

it('should have a name', function(){
  const actual = hotel1.hotelName;
  assert.strictEqual(actual, "Hotel California")
});

it('should have a price', function(){
  const actual = hotel1.hotelPrice;
  assert.strictEqual(actual, 249.99)
});

it('should have a currency', function(){
  const actual = hotel1.currency
  assert.strictEqual(actual, "USD");
});

it('should have amenities', function(){
  const actual = hotel1.amenities;
  assert.deepStrictEqual(actual, ["POOL", "RESTAURANT", "WI-FI"])
});

it('should have a description', function(){
  const actual = hotel1.description;
  assert.strictEqual(actual, "You can check in any time you like, but you can never leave")
});

it('should have a small image', function(){
  const actual = hotel1.smallImage;
  assert.strictEqual(actual, "http://bxit.ly/2oLQcwQ")
});

it('should have a big image', function(){
  const actual = hotel1.bigImage;
  assert.strictEqual(actual, "http://bxit.ly/1T09dWo")
});

it('should have a star rating', function(){
  const actual = hotel1.starRating;
  assert.strictEqual(actual, 5)
});

it('should have a latitude', function(){
  const actual = hotel1.latitude;
  assert.strictEqual(actual, 666.666)
});

it('should have a longitude', function(){
  const actual = hotel1.longitude;
  assert.strictEqual(actual, 777.777);
});




});
