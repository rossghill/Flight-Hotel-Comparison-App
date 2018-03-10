const FlightEntity = function(flightDetails){

  this.origin           = flightDetails.origin;
  this.destination      = flightDetails.destination;
  this.departureTime    = flightDetails.departureTime.replace("T", " ");
  this.arrivalTime      = flightDetails.arrivalTime.replace("T", " ");


}


module.exports = FlightEntity;
