const DOMHelper                 = require("./helpers/DOMHelper");
const ClientRequest             = require("./requests/clientRequest");
const PackageListView           = require("./views/packageListView");
const PackageView               = require("./views/packageView");
const HotelView                 = require("./views/hotelView");
const FlightView                = require("./views/flightView");
const MapView                   = require("./views/mapView");
const ExtraFiltersView          = require("./views/ExtraFiltersView");
const FlightHotelPackagesModel  = require("./models/flightHotelPackagesModel");

let travelPackageList         = [];
let travelPackageListFiltered = [];
let flightHotelPackagesEntity = null;
let packagesMapView           = null;

const initializeFlightR = function(){
  domHelper = new DOMHelper();
  document.getElementById("button-get-flight").addEventListener(    "click",    getPackages);
  document.getElementById("search-origin").addEventListener(        "input",    getAirportCities);
  document.getElementById("search-destination").addEventListener(   "input",    getAirportCities);
  document.getElementById("checkbox-list-map-mode").addEventListener("click",   domHelper.checkboxToggleVisibility.bind(this, "checkbox-list-map-mode", "div-packages-list", "div-packages-map"));
  domHelper.changeDisplay("div-packages-map", false);
}

const getPackages = function(){

let origin          = document.getElementById('origin').value;
let destination     = document.getElementById('destination').value;
let departureDate   = document.getElementById('departureDate').value;
let returnDate      = document.getElementById('returnDate').value;
let adults          = document.getElementById('adults').value;
let children        = document.getElementById('children').value;

origin = "LON";
destination = "CDG";
departureDate= "2018-06-10";
returnDate = "2018-06-17";
adults = 2;
children = 1;

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
}

const populatePackages = function()
{
  flightHotelPackagesEntity = JSON.parse(this.responseText);

  if(flightHotelPackagesEntity.flightHotelPackages)
  {
      packagesMapView = new MapView(    document.getElementById("div-packages-map"),
                                        flightHotelPackagesEntity.destinationAirportLatitude,
                                        flightHotelPackagesEntity.destinationAirportLongitude,
                                        12);

      travelPackageList         = flightHotelPackagesEntity.flightHotelPackages
      travelPackageListFiltered = flightHotelPackagesEntity.flightHotelPackages

      populateTravelPackageListAndMap();
      populateExtraFilters();
  }
  else{
      console.log("populatePackages, error : " + this.responseText);
  }
}


const populateTravelPackageListAndMap = function()
{
    // Populate the list of packages
    const packageListView = new PackageListView();
    let displayMinimap = document.getElementById("checkbox-display-minimap").checked;
    packageListView.createPackageList(travelPackageListFiltered, displayMinimap);
    packagesMapView.populateMapWithHotels(travelPackageListFiltered);
}

const populateExtraFilters = function()
{
  let flightHotelPackagesModel = new FlightHotelPackagesModel(travelPackageList);
  let extraFiltersView         = new ExtraFiltersView(updateTravelPackageList);
  extraFiltersView.createExtraFilters(flightHotelPackagesModel.getPriceMin(),
                                      flightHotelPackagesModel.getPriceMax());
  extraFiltersView.updateCurrentBudgetLabel();
}

const updateTravelPackageList = function(filterEvent)
{
  let extraFiltersView         = new ExtraFiltersView();
  let flightHotelPackagesModel = new FlightHotelPackagesModel(travelPackageList);
  travelPackageListFiltered    = flightHotelPackagesModel.filterTravelPackages(extraFiltersView.getExtraFilterValues());
  extraFiltersView.updateCurrentBudgetLabel();
  populateTravelPackageListAndMap();
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

const populateAirportCities = function(input)
{
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
