const CreateFlightPackage = function(){
  this.createOutboundFlight();
  this.createInboundFlight();
  this.createHotelPriceAndAddFaveAction();
}

CreateViewPackage.prototype.createOutboundFlight = function(){
  this.createFlight();
}

CreateViewPackage.prototype.createInboundFlight = function(){
  this.createFlight();
}

CreateViewPackage.prototype.createFlightPriceAndChangeAction = function(){

}

CreateViewPackage.prototype.createFlight = function(){

}


module.exports = CreateFlightPackage;
