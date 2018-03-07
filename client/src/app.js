const DOMHelper       = require("./helpers/DOMHelper");
const ClientRequest   = require("./requests/clientRequest");
const PackageListView = require("./views/packageListView");
const PackageView     = require("./views/packageView");
const HotelView       = require("./views/hotelView");
const FlightView      = require("./views/flightView");

const initializeFlightR = function(){
  document.getElementById("button-get-flight").addEventListener("click", getPackages);
  document.getElementById("search-origin").addEventListener("input", getAirportCities);
  document.getElementById("search-destination").addEventListener("input", getAirportCities);
}

const getPackages = function(){

let origin          = document.getElementById('origin').value;
let destination     = document.getElementById('destination').value;
let departureDate   = document.getElementById('departureDate').value;
let returnDate      = document.getElementById('returnDate').value;
let adults          = document.getElementById('adults').value;
let children        = document.getElementById('children').value;

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

  console.log(url);

  request.open("GET", url);
  request.addEventListener("load", populatePackages);
  request.send();
  // console.log("getPackages");
  // clientRequest = new ClientRequest();
  // clientRequest.sendRequestGetFlight(getPackagesCallBack);

}

const populatePackages = function(){
  const packageListView = new PackageListView();
  const flightHotelPackagesJSON = JSON.parse(this.responseText);
  if(flightHotelPackagesJSON.flightHotelPackages)
  {
    packageListView.createPackageList(flightHotelPackagesJSON.flightHotelPackages);
  }
  else{
      console.log("populatePackages, error : "+this.responseText);
  }
}





const getAirportCities = function(){
  if(this.value != "")
  {
    const request = new XMLHttpRequest()
    let url = `http://localhost:3000/search-airport-cities?airportCity=${this.value}`;
    request.open("GET", url);

    let input = null;
    if(this.id == "search-origin")
    {
      input = document.getElementById("origin");
    }
    else
    {
      input = document.getElementById("destination");
    }

    request.addEventListener("load", populateAirportCities.bind(request, input));
    request.send();
  }
  else
  {
    let helper = new DOMHelper();
    helper.createSelectOptions(this.id, []);
    helper.setSelectSize(this.id, 1);
  }
}

const populateAirportCities = function(input){
  const airportCitiesArray          = JSON.parse(this.responseText);
  const airportCitiesArrayForSelect = airportCitiesArray.map(function(airportCity){
    return {"value": airportCity.value, "label": airportCity.label};
  });

  let helper = new DOMHelper();
  helper.createSelectOptions(input.id, airportCitiesArrayForSelect);
  helper.setSelectSize(input.id, 5);
  helper.addEventListenerOnChangeSelectOriginOrDestination(input.id, "search-"+input.id);
}




document.addEventListener("DOMContentLoaded", initializeFlightR);
