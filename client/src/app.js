const ClientRequest   = require("./requests/clientRequest");
const PackageListView = require("./views/packageListView");
const PackageView     = require("./views/packageView");
const HotelView       = require("./views/hotelView");
const FlightView      = require("./views/flightView");

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

// origin = "LON";
// destination = "CDG";
// departureDate= "2018-06-10";
// returnDate = "2018-06-17";
// adults = 2;
// children = 1;

  const request = new XMLHttpRequest()
  let url = "http://localhost:3000/search-for-packages?";
  url += `origin=${origin}`;
  url += `&destination=${destination}`;
  url += `&departureDate=${departureDate}`;
  url += `&returnDate=${returnDate}`;
  url += `&adults=${adults}`;
  url += `&children=${children}`;



  request.open("GET", url);
  request.addEventListener("load", populatePackages);
  request.send();
  // console.log("getPackages");
  // clientRequest = new ClientRequest();
  // clientRequest.sendRequestGetFlight(getPackagesCallBack);

}

const populatePackages = function(){
  const packageListView = new PackageListView();
  console.log(this.responseText);
  const flightHotelPackagesJSON = JSON.parse(this.responseText);
  packageListView.createPackageList(flightHotelPackagesJSON.flightHotelPackages);
}












document.addEventListener("DOMContentLoaded", initializeFlightR);
