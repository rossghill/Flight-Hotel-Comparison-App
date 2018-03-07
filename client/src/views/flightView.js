const FlightView = function(){

}

FlightView.prototype.createFlight = function(flightEntity){
  let createFlightDiv = document.createElement("div");
  //populate createFlightDiv
  return createFlightDiv;
}

FlightView.prototype.createOutboundFlight = function(outboundFlightEntity){
  let outboundFlightDiv = document.createElement("div");
  let outboundHeaderDiv = document.createElement("div");
  let outboundBodyDiv = this.createFlight(outboundFlightEntity);

  outboundFlightDiv.appendChild(outboundHeaderDiv);
  outboundFlightDiv.appendChild(outboundBodyDiv);

  return outboundFlightDiv;
}

FlightView.prototype.createInboundFlight = function(inboundFlightEntity){
  let inboundFlightDiv = document.createElement("div");
  let inboundHeaderDiv = document.createElement("div");
  let inboundBodyDiv = this.createFlight(inboundFlightEntity);

  inboundFlightDiv.appendChild(inboundHeaderDiv);
  inboundFlightDiv.appendChild(inboundBodyDiv);

  return inboundFlightDiv;
}

FlightView.prototype.createFlightPriceAndChangeAction = function(flightPrice){

  let priceDiv = document.createElement("div");
  createFlightDiv.appendChild(priceDiv)
  return priceDiv;
}


FlightView.prototype.createFlightView = function(flightPackage){
  let mainDiv = document.createElement("div");


  let outboundFlightDiv = this.createOutboundFlight(flightPackage.outboundFlight);
  let inboundFlightDiv  = this.createInboundFlight(flightPackage.inboundFlight);
  let priceDiv          = this.createFlightPriceAndChangeAction(flightPackage.flightPrice);

  mainDiv.appendChild(outboundFlightDiv);
  mainDiv.appendChild(inboundFlightDiv);
  mainDiv.appendChild(priceDiv);
  // console.log(flightPackage);
  return mainDiv;
}


module.exports = FlightView;
