const ClientRequest = require("./requests/clientRequest");




const initializeFlightR = function(){
  console.log("initializeFlightR");
  document.getElementById("button_get_flight").addEventListener("click", getPackages);
}

const getPackages = function(){

const origin = document.getElementById('origin').value;
const destination = document.getElementById('destination').value;
const departureDate = document.getElementById('departureDate').value;
const returnDate = document.getElementById('returnDate').value;
const adults = document.getElementById('adults').value;
const children = document.getElementById('children').value;

  const request = new XMLHttpRequest()
  let url = "http://localhost:3000/search-for-packages?";
  url += `origin=${origin}`;
  url += `&destination=${destination}`;
  url += `&departureDate=${departureDate}`;
  url += `&returnDate=${returnDate}`;
  url += `&adults=${adults}`;
  url += `&children=${children}`;

  request.open("GET", url);
  request.addEventListener("load", getPackagesCallBack);
  request.send();
  console.log("getPackages");
  // clientRequest = new ClientRequest();
  // clientRequest.sendRequestGetFlight(getPackagesCallBack);

}

const getPackagesCallBack = function(){
  document.getElementById("div_flight_list").innerText = this.responseText;
}












document.addEventListener("DOMContentLoaded", initializeFlightR);
