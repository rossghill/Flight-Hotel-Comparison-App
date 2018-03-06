const FlightEntity = function(flightDetails){

  this.origin = flightDetails.origin;
  this.destination = flightDetails.destination;
  this.departureTime = flightDetails.departureTime;
  this.arrivalTime = flightDetails.arrivalTime;


}


module.exports = FlightEntity;
