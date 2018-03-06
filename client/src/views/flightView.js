const FlightView = function(flightPackage){
  this.createOutboundFlight(flightPackage.outboundFlight);
  this.createInboundFlight(flightPackage.inboundFlight);
  this.createFlightPriceAndChangeAction(flightPackage.totalPrice);
}

FlightView.prototype.createOutboundFlight = function(flightEntity){
  this.createFlight(flightEntity);

}

FlightView.prototype.createInboundFlight = function(flightEntity){
  this.createFlight(flightEntity);

}

FlightView.prototype.createFlightPriceAndChangeAction = function(totalPrice){

}

FlightView.prototype.createFlight = function(flightEntity){

}


module.exports = FlightView;
