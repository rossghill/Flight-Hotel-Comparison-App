const assert = require('assert');
const FlightPackage = require('../flightPackage');

describe('Flight Packages', function(){

let flightPackage;

beforeEach(function() {
  outboundFlights = {"origin": "LAX",
                  "destination": "LON",
                  "departureTime": "2018-03-16T12:50",
                  "arrivalTime": "2018-03-16T17:10"};
  inboundFlights = {"origin": "LON",
                    "destination": "LAX",
                    "departureDate": "2018-05-23T00:00",
                    "arrivalTime": "2018-05-24T09:00"}
  flightPackage = new FlightPackage(outboundFlights, inboundFlights, 900.00);
});

it('flight package has outbound flights', function(){
  const actual = flightPackage.outboundFlights;
  assert.deepStrictEqual(actual, {"origin": "LAX",
                  "destination": "LON",
                  "departureTime": "2018-03-16T12:50",
                  "arrivalTime": "2018-03-16T17:10"})
});

it('flight package has inbound flights', function(){
  const actual = flightPackage.inboundFlights;
  assert.deepStrictEqual(actual, {"origin": "LON",
                    "destination": "LAX",
                    "departureDate": "2018-05-23T00:00",
                    "arrivalTime": "2018-05-24T09:00"})
});

it('flight should have total price', function(){
  const actual = flightPackage.totalPrice;
  assert.strictEqual(actual, 900.00);
})



});
