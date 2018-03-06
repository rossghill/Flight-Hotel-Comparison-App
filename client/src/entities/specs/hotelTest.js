const assert = require('assert');
const Hotel = require('../hotelEntity');

describe('Hotel', function(){

let hotel1;

beforeEach(function(){
  const hotelDetails = {
    "hotelName": "Hotel California",
    "price": 249.99,
    "currency": "USD",
    "amenxities": ["POOL", "RESTAURANT", "WI-FI"],
    "description": "You can check in any time you like, but you can never leave",
    "smallImage": "http://bxit.ly/2oLQcwQ",
    "bigImage": "http://bxit.ly/1T09dWo",
    "starRating": 5,
    "latxitude": 666.666,
    "longxitude": 777.777,
  }
  hotel1 = new Hotel(hotelDetails);
});

it('should have a name', function(){
  const actual = hotel1.hotelName;
  assert.strictEqual(actual, "Hotel California")
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})
xit('should have a', function(){
  const actual = hotel1.
  assert.strictEqual(actual, )
})




});
