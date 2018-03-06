const FlightPackage = function(outboundFlights, inboundFlights, flightPrice){

  this.outboundFlights = outboundFlights;
  this.inboundFlights = inboundFlights;
  this.flightPrice = parseFloat(flightPrice);

}

module.exports = FlightPackage;
