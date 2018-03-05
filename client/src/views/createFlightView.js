const CreateFlightView = function(flightPackage){
  this.createOutboundFlight(flightPackage.outboundFlight);
  this.createInboundFlight(flightPackage.inboundFlight);
  this.createFlightPriceAndChangeAction(flightPackage.totalPrice);
}

CreateFlightView.prototype.createOutboundFlight = function(flightEntity){
  this.createFlight(flightEntity);

}

CreateFlightView.prototype.createInboundFlight = function(flightEntity){
  this.createFlight(flightEntity);

}

CreateFlightView.prototype.createFlightPriceAndChangeAction = function(totalPrice){

}

CreateFlightView.prototype.createFlight = function(flightEntity){

}


module.exports = CreateFlightView;
