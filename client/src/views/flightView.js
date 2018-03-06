const FlightView = function(){

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

FlightView.prototype.createFlightView = function(flightPackage){
  this.createOutboundFlight(flightPackage.outboundFlight);
  this.createInboundFlight(flightPackage.inboundFlight);
  this.createFlightPriceAndChangeAction(flightPackage.totalPrice);
  return document.createElement("div");
}


module.exports = FlightView;
