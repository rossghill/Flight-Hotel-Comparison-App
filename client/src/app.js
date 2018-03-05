const ClientRequest = require("./requests/clientRequest");




const initializeFlightR = function(){
  console.log("initializeFlightR");
  document.getElementById("button_get_flight").addEventListener("click", getPackages);
}

const getPackages = function(){

let origin = document.getElementById('origin').value;
let destination = document.getElementById('destination').value;
let departureDate = document.getElementById('departureDate').value;
let returnDate = document.getElementById('returnDate').value;
let adults = document.getElementById('adults').value;
let children = document.getElementById('children').value;

//   origin = "EDI";
// destination = "LON";
// departureDate= "2018-03-10";
// returnDate = "2018-03-17";
// adults = 2;
// children = 2;

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
  // console.log("getPackages");
  // clientRequest = new ClientRequest();
  // clientRequest.sendRequestGetFlight(getPackagesCallBack);

}

const getPackagesCallBack = function(){
  document.getElementById("container-packages").innerText = this.responseText;
}












document.addEventListener("DOMContentLoaded", initializeFlightR);
