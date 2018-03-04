const ClientRequest = require("./requests/clientRequest");




const initializeFlightR = function(){
  console.log("initializeFlightR");
  document.getElementById("button_get_flight").addEventListener("click", getFlights);
}

const getFlights = function(){

  const request = new XMLHttpRequest()
  request.open("GET", "http://localhost:3000/flights");
  request.addEventListener("load", getFlightsCallBack);
  request.send();
  console.log("getFlights");
  // clientRequest = new ClientRequest();
  // clientRequest.sendRequestGetFlight(getFlightsCallBack);

}

const getFlightsCallBack = function(){
  document.getElementById("div_flight_list").innerText = this.responseText;
}












document.addEventListener("DOMContentLoaded", initializeFlightR);
