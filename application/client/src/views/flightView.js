const DOMHelper = require("./../entities/helpers/DOMHelper");

const FlightView = function(){
  domHelper = new DOMHelper();
}

FlightView.prototype.createFlight = function(flightEntity){
  let flightDiv = document.createElement("div");
  flightDiv.classList.add("flight-class")

  //populate createFlightDiv
  let originSpan        = document.createElement("p")
  let destinationSpan   = document.createElement("p")

  originSpan.innerText        = flightEntity.origin+" "+flightEntity.departureTime;
  destinationSpan.innerText   = flightEntity.destination+" "+flightEntity.arrivalTime;

  flightDiv.appendChild(originSpan);
  flightDiv.appendChild(destinationSpan);

  return flightDiv;
}

FlightView.prototype.createFlightWay = function(flightEntities, way){

  let imageName   = "";
  let headerLabel = "";

  if(way === "outbound"){
    imageName   = "flight-going.jpg";
    headerLabel = "Outbound";
  }
  else
  {
    imageName   = "flight-returning.jpg";
    headerLabel = "Inbound";
  }

  let headerFlightDiv         = domHelper.createDivElement("flex-row-flex-center");
  let flightImg               = domHelper.createImageElement(imageName);
  flightImg.className         = "image-flight";
  headerFlightDiv.appendChild(flightImg)

  let flightWay               = domHelper.createDivElement()
  flightWay.innerText         = headerLabel
  headerFlightDiv.appendChild(flightWay);

  let bodyFlightDiv         = this.createFlight(flightEntities[0]);

  let flightDiv             = domHelper.createDivElement("div-flight-way");
  flightDiv.appendChild(headerFlightDiv);
  flightDiv.appendChild(bodyFlightDiv);

  return flightDiv;
}


FlightView.prototype.createFlightPriceAndChangeAction = function(flightPrice){

  let divPriceAndChangeAction = domHelper.createDivElement("div-flight-footer");

  let priceDiv         = domHelper.createDivElement("div-flight-price");
  let priceSpan        = document.createElement("span");
  priceSpan.innerText  = "£ " + flightPrice.toFixed(2);
  priceDiv.appendChild(priceSpan);
  divPriceAndChangeAction.appendChild(priceDiv);

  let action = domHelper.createDivElement();
  let button = domHelper.createButtonElement("button-blue", "CHANGE");
  action.appendChild(button);
  divPriceAndChangeAction.appendChild(action);


  return divPriceAndChangeAction;
}


FlightView.prototype.createFlightView = function(flightPackage){
  let mainFlightDiv     = domHelper.createDivElement("section-flight");
  let outboundFlightDiv = this.createFlightWay(flightPackage.outboundFlights, "outbound");
  let inboundFlightDiv  = this.createFlightWay(flightPackage.inboundFlights,  "inbound");
  let priceDiv          = this.createFlightPriceAndChangeAction(flightPackage.flightPrice);

  let flightWays = domHelper.createDivElement("div-flight-main");

  flightWays.appendChild(outboundFlightDiv);
  flightWays.appendChild(inboundFlightDiv);

  mainFlightDiv.appendChild(flightWays);
  mainFlightDiv.appendChild(priceDiv);

  return mainFlightDiv;
}


module.exports = FlightView;
