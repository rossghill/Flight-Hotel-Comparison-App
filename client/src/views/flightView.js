const FlightView = function(){

}

FlightView.prototype.createFlight = function(flightEntity){
  let flightDiv = document.createElement("div");

  //populate createFlightDiv
  let originSpan        = document.createElement("span")
  let departureTimeSpan = document.createElement("span")
  let arrivalTimeSpan   = document.createElement("span")
  let destinationSpan   = document.createElement("span")

  originSpan.innerText        = flightEntity.origin;
  departureTimeSpan.innerText = flightEntity.departureTime;
  arrivalTimeSpan.innerText   = flightEntity.arrivalTime;
  destinationSpan.innerText   = flightEntity.destination;

  flightDiv.appendChild(originSpan);
  flightDiv.appendChild(departureTimeSpan);
  flightDiv.appendChild(arrivalTimeSpan);
  flightDiv.appendChild(destinationSpan);

  return flightDiv;
}

FlightView.prototype.createOutboundFlight = function(outboundFlightEntity){
  console.log(outboundFlightEntity);

  let outboundFlightDiv = document.createElement("div");
  let outboundHeaderDiv = document.createElement("div");
  let outboundBodyDiv = this.createFlight(outboundFlightEntity[0]);

  outboundFlightDiv.appendChild(outboundHeaderDiv);
  outboundFlightDiv.appendChild(outboundBodyDiv);

  return outboundFlightDiv;
}

FlightView.prototype.createInboundFlight = function(inboundFlightEntity){
  let inboundFlightDiv = document.createElement("div");
  let inboundHeaderDiv = document.createElement("div");
  let inboundBodyDiv = this.createFlight(inboundFlightEntity[0]);

  inboundFlightDiv.appendChild(inboundHeaderDiv);
  inboundFlightDiv.appendChild(inboundBodyDiv);

  return inboundFlightDiv;
}

FlightView.prototype.createFlightPriceAndChangeAction = function(flightPrice){

  let priceDiv = document.createElement("div");
  let priceSpan        = document.createElement("span");
  priceSpan.innerText  = flightPrice;

  priceDiv.appendChild(priceSpan);
  return priceDiv;
}


FlightView.prototype.createFlightView = function(flightPackage){
  let mainDiv = document.createElement("div");

  console.log(flightPackage);
  let outboundFlightDiv = this.createOutboundFlight(flightPackage.outboundFlights);
  let inboundFlightDiv  = this.createInboundFlight(flightPackage.inboundFlights);
  let priceDiv          = this.createFlightPriceAndChangeAction(flightPackage.flightPrice);

  mainDiv.appendChild(outboundFlightDiv);
  mainDiv.appendChild(inboundFlightDiv);
  mainDiv.appendChild(priceDiv);
  // console.log(flightPackage);
  return mainDiv;
}


module.exports = FlightView;
