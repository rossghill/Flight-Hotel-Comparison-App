const FlightPackage = function(outboundFlights, inboundFlights, totalPrice){

  this.outboundFlights = outboundFlights;
  this.inboundFlights = inboundFlights;
  this.totalPrice = parseFloat(totalPrice);

}

module.exports = FlightPackage;
