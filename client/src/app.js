const DOMHelper       = require("./entities/helpers/DOMHelper");
const ClientRequest   = require("./requests/clientRequest");
const PackageListView = require("./views/packageListView");
const PackageView     = require("./views/packageView");
const HotelView       = require("./views/hotelView");
const FlightView      = require("./views/flightView");
const MapView         = require ("./views/mapView");
const ExtraFiltersView          = require("./views/ExtraFiltersView");
const FlightHotelPackagesModel  = require("./models/flightHotelPackagesModel");
const Modal           = require ("./../build/modal");

let travelPackageList         = [];
let travelPackageListFiltered = [];
let flightHotelPackagesEntity = null;
let packagesMapView           = null;
let extraFiltersView          = null;

const initializeFlightR = function(){
  domHelper = new DOMHelper();
  document.getElementById("button-get-flight").addEventListener(    "click",    getPackages);
  document.getElementById("search-origin").addEventListener(        "input",    getAirportCities);
  document.getElementById("search-destination").addEventListener(   "input",    getAirportCities);
  document.getElementById("checkbox-list-map-mode").addEventListener("click",   domHelper.checkboxToggleVisibility.bind(this, "checkbox-list-map-mode", "div-packages-list", "div-packages-map"));
  domHelper.changeDisplay("div-packages-map", false);

  //favouritesList and loading modal
  const pageModals = new Modal();
  pageModals.createFavouritesModal();
  pageModals.createLoadingModal();
}

const getPackages = function(){

let origin          = document.getElementById('origin').value;
let destination     = document.getElementById('destination').value;
let departureDate   = document.getElementById('departureDate').value;
let returnDate      = document.getElementById('returnDate').value;
let adults          = document.getElementById('adults').value;
let children        = document.getElementById('children').value;

  // const request = new XMLHttpRequest()
  // let url = "http://localhost:3000/search-for-packages?";
  // url += `origin=${origin}`;
  // url += `&destination=${destination}`;
  // url += `&departureDate=${departureDate}`;
  // url += `&returnDate=${returnDate}`;
  // url += `&adults=${adults}`;
  // url += `&children=${children}`;

  // request.open("GET", url);
  // request.addEventListener("load", populatePackages);
  // request.send();

  populatePackages()
}

const populatePackages = function()
{
  flightHotelPackagesEntity = JSON.parse(mimicData());//JSON.parse(this.responseText);

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
    let displayMinimap    = document.getElementById("checkbox-display-minimap").checked;
    packageListView.createPackageList(travelPackageListFiltered, displayMinimap);
    packagesMapView.populateMapWithHotelsInfoBoxes(travelPackageListFiltered);
}



const updateTravelPackageList = function(filterEvent)
{
  let flightHotelPackagesModel = new FlightHotelPackagesModel(travelPackageList);
  travelPackageListFiltered    = flightHotelPackagesModel.filterTravelPackages(extraFiltersView.getExtraFilterValues());
  extraFiltersView.updateCurrentBudgetLabel();
  populateTravelPackageListAndMap();
}


const populateExtraFilters = function()
{
  let flightHotelPackagesModel = new FlightHotelPackagesModel(travelPackageList);
  extraFiltersView             = new ExtraFiltersView(updateTravelPackageList);
  extraFiltersView.createExtraFilters(flightHotelPackagesModel.getPriceMin(),
                                      flightHotelPackagesModel.getPriceMax());
  extraFiltersView.updateCurrentBudgetLabel();
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


const mimicData = function(){
  return '{"flightHotelPackages":[{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Comfort Hotel Cdg Goussainville","hotelPrice":487.07,"currency":"USD","amenities":["RESTAURANT"],"description":"I have this theory that, depending on your attitude, your life doesnt have to become this ridiculous charade that it seems so many people end up living. Christian Bale","smallImage":"https://pixabay.com/get/e830b5072cf3053ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","bigImage":"https://pixabay.com/get/e830b5072cf3053ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","starRating":"","latitude":49.0228,"longitude":2.45753},"packagePrice":779},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Campanile Ecouen","hotelPrice":612.02,"currency":"USD","amenities":["PARKING","POOL","RESTAURANT"],"description":"Beginning today, treat everyone you meet as if they were going to be dead by midnight. Extend to them all the care, kindness and understanding you can muster, and do it with no thought of any reward. Your life will never be the same again. Og Mandino","smallImage":"https://pixabay.com/get/eb30b70a2ff5073ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","bigImage":"https://pixabay.com/get/eb30b70a2ff5073ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","starRating":"4","latitude":49.01686,"longitude":2.38567},"packagePrice":903.95},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Golden Tulip Roissy Saint Witz","hotelPrice":686.5,"currency":"USD","amenities":["PARKING","POOL","INTERNET_PUBLIC_AREAS"],"description":"Be modest, be respectful of others, try to understand. Lakhdar Brahimi","smallImage":"https://pixabay.com/get/e83cb20f2af51c2ad65a5854ee4e4e94e277e6c818b4134193f3c07fafe5_640.jpg","bigImage":"https://pixabay.com/get/e83cb20f2af51c2ad65a5854ee4e4e94e277e6c818b4134193f3c07fafe5_640.jpg","starRating":"4","latitude":49.0899,"longitude":2.55443},"packagePrice":978.4300000000001},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Ibis Budget Roissy Cdg Paris","hotelPrice":749.81,"currency":"USD","amenities":["PARKING","ACCESSIBLE_FACILITIES"],"description":"My father gave me the greatest gift anyone could give another person, he believed in me. Jim Valvano","smallImage":"https://pixabay.com/get/ea35b20d2cf7013ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","bigImage":"https://pixabay.com/get/ea35b20d2cf7013ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","starRating":"2","latitude":48.98972,"longitude":2.51296},"packagePrice":1041.74},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Premiere Classe Roissy - Aeroport Cdg -","hotelPrice":756.02,"currency":"USD","amenities":["PARKING","POOL"],"description":"I think I have an inner confidence that my tastes are pretty simple, that what I find funny finds a wide audience. Im not particularly intellectual or clever or minority-focused in my creative instincts. And Im certainly not aware of suppressing more sophisticated ambitions. Rowan Atkinson","smallImage":"https://pixabay.com/get/e830b5072bf4043ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","bigImage":"https://pixabay.com/get/e830b5072bf4043ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","starRating":"4","latitude":49.01735,"longitude":2.58876},"packagePrice":1047.95},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Comfort Hotel Airport Cdg","hotelPrice":781.9,"currency":"USD","amenities":["RESTAURANT"],"description":"Quite often - a lot of the work I had done had been extensively with women. Most especially in the theater, but also quite often in the movies. That has its own delights, and maybe pitfalls too. John Malkovich","smallImage":"https://pixabay.com/get/ee31b00d21f21c2ad65a5854ee4e4e94e277e6c818b4134193f3c07fafe5_640.jpg","bigImage":"https://pixabay.com/get/ee31b00d21f21c2ad65a5854ee4e4e94e277e6c818b4134193f3c07fafe5_640.jpg","starRating":"","latitude":49.01975,"longitude":2.5869},"packagePrice":1073.83},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"B-b Hotel Paris Nord Aulnay Sous Bois","hotelPrice":798.23,"currency":"USD","amenities":[],"description":"I say at this point, for different reasons, Bush and Hussein are both very threatening to world peace and to deny that is to be incredibly naive. Janeane Garofalo","smallImage":"https://pixabay.com/get/e83cb20629f1033ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","bigImage":"https://pixabay.com/get/e83cb20629f1033ed95c4518b744449ee176e2d104b0144395f6c278a1e5bd_640.jpg","starRating":"4","latitude":48.9543,"longitude":2.48356},"packagePrice":1090.16},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Premiere Classe Villepinte - Parc Expo","hotelPrice":810.64,"currency":"USD","amenities":["PARKING","POOL"],"description":"Tarif flexible 1 SINGLE BED ","smallImage":"","bigImage":"","starRating":"4","latitude":48.97294,"longitude":2.51165},"packagePrice":1102.57},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"Campanile Roissy - Saint Witz","hotelPrice":835.47,"currency":"USD","amenities":["RESTAURANT","ACCESSIBLE_FACILITIES","PARKING","POOL"],"description":"Tarif flexible 1 DOUBLE BED, 1 JUNIOR BED (UP TO 10 YEARS) - ROOM NEXT GENERATION ","smallImage":"","bigImage":"","starRating":"","latitude":49.09151,"longitude":2.55192},"packagePrice":1127.4},{"flightPackage":{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},"hotel":{"hotelName":"B-b Hotel Paris Nord Villepinte","hotelPrice":1015.48,"currency":"USD","amenities":[],"description":"DOUBLE NON SMOKING ROOM ","smallImage":"","bigImage":"","starRating":"4","latitude":48.96292,"longitude":2.5535},"packagePrice":1307.41}],"flightPackages":[{"outboundFlights":[{"origin":"SEN","destination":"CDG","departureTime":"2018-06-10T13:30","arrivalTime":"2018-06-10T15:40"}],"inboundFlights":[{"origin":"CDG","destination":"LTN","departureTime":"2018-06-17T08:55","arrivalTime":"2018-06-17T09:10"}],"flightPrice":291.93},{"outboundFlights":[{"origin":"LHR","destination":"CDG","departureTime":"2018-06-10T06:20","arrivalTime":"2018-06-10T08:40"}],"inboundFlights":[{"origin":"CDG","destination":"LHR","departureTime":"2018-06-17T07:35","arrivalTime":"2018-06-17T07:55"}],"flightPrice":406.57},{"outboundFlights":[{"origin":"LGW","destination":"CDG","departureTime":"2018-06-10T07:50","arrivalTime":"2018-06-10T10:05"}],"inboundFlights":[{"origin":"CDG","destination":"LGW","departureTime":"2018-06-17T07:00","arrivalTime":"2018-06-17T07:10"}],"flightPrice":422.11}],"destinationAirportLatitude":49.01278,"destinationAirportLongitude":2.55}';
}


document.addEventListener("DOMContentLoaded", initializeFlightR);
