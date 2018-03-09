//add Package model
//require Hotel model in searchPageRouter

const HotelEntity           = require("./../../client/src/entities/hotelEntity");
const FlightEntity          = require("./../../client/src/entities/flightEntity");
const FlightHotelPackage    = require("./../../client/src/entities/flightHotelPackage");
const FlightPackage         = require("./../../client/src/entities/flightPackage");
const AmadeusAPI            = require("./../api/AmadeusAPI");
const FlightHotelPackages   = require("./../../client/src/entities/flightHotelPackages");
const ServerHotelModel      = require("./serverHotelModel");
const PhotoModel            = require("./photoModel.js");
const DescriptionAPI        = require("./../api/DescriptionAPI");

const Package = function(){
  this.requestForFlightDone              = false;
  this.requestForHotelDone               = false;
  this.requestForHotelPhotos             = false;
  this.requestForDescription             = false;
  this.requestForAirportLocation         = false;
  this.amadeusAPI                        = new AmadeusAPI();
  this.photoModel                        = new PhotoModel();
  this.descriptionAPI                    = new DescriptionAPI();
  this.flightPackagesArray               = [];
  this.hotelEntitiesArray                = [];
  this.flightHotelPackagesArray          = [];
  this.hotelImagesArray                  = [];
  this.hotelDescriptionArray             = [];
  this.onflightHotelPackagesArrayUpdate  = null;
  this.destinationAirportLatitude        = null;
  this.destinationAirportLongitude       = null;
}

Package.prototype.checkRequestsStatus = function() {
return(    this.requestForFlightDone
        && this.requestForHotelDone
        && this.requestForHotelPhotos
        && this.requestForDescription
        && this.requestForAirportLocation);
}

Package.prototype.createFlightPackages = function(flights){
  let flightPackagesArray = [];
  flights.results.forEach(function(flight){
    let outbound      = flight.itineraries[0].outbound.flights;
    let inbound       = flight.itineraries[0].inbound.flights;
    let totalPrice    = flight.fare.total_price;
    let flightPackage = this.createFlightPackage(outbound, inbound, totalPrice);
    flightPackagesArray.push(flightPackage);
  }.bind(this));
  return flightPackagesArray;
}

Package.prototype.createFlightPackage = function(jsonOutboundFlightsArray, jsonInboundFlightsArray, totalPrice) {
  let outboundFlightEntities = [];
  jsonOutboundFlightsArray.forEach(function(jsonFlight){
    let flightEntity = this.createFlightEntity(jsonFlight);
    outboundFlightEntities.push(flightEntity);
  }.bind(this));

  let inboundFlightEntities = [];
  jsonInboundFlightsArray.forEach(function(jsonFlight){
    let flightEntity = this.createFlightEntity(jsonFlight);
    inboundFlightEntities.push(flightEntity);
  }.bind(this));

  let flightPackage = new FlightPackage(outboundFlightEntities, inboundFlightEntities, totalPrice)
  return flightPackage;
}

Package.prototype.createFlightEntity = function(flightJson) {
  let flightDetails = {};

  flightDetails.origin        = flightJson.origin.airport;
  flightDetails.destination   = flightJson.destination.airport;
  flightDetails.departureTime = flightJson.departs_at;
  flightDetails.arrivalTime   = flightJson.arrives_at;

  let flightEntity = new FlightEntity(flightDetails);
  return flightEntity;
}

Package.prototype.createHotelEntity = function (hotelJson) {
const serverHotelModel = new ServerHotelModel();
let hotelEntity = serverHotelModel.createHotelEntityDefaults();

//hotelDetails["hotelName"] = hotelJson.property_name;
        hotelEntity.hotelName  = hotelJson.property_name;
        hotelEntity.hotelPrice = parseFloat(hotelJson.total_price.amount);
        hotelEntity.currency   = hotelJson.total_price.currency;

//amenities
        let amenitiesArray = []
        hotelJson.amenities.forEach(function(amenity){
          if(amenity.amenity === "INTERNET_PUBLIC_AREAS"){
            amenitiesArray.push("INTERNET_PUBLIC_AREAS");
          } else if(amenity.amenity === "RESTAURANT"){
            amenitiesArray.push("RESTAURANT");
          } else if(amenity.amenity === "PARKING"){
            amenitiesArray.push("PARKING");
          } else if(amenity.amenity === "POOL"){
            amenitiesArray.push("POOL");
          } else if(amenity.amenity === "ACCESSIBLE_FACILITIES"){
            amenitiesArray.push("ACCESSIBLE_FACILITIES");
          }
        });
        hotelEntity.amenities = amenitiesArray;
//description
        let descriptionText = ""
        hotelJson.rooms[0].descriptions.forEach(function(textItem){
          descriptionText += textItem + " ";
        });
        hotelEntity.description = descriptionText;

//images
        if(hotelJson.images[0] !== undefined){
        hotelEntity.smallImage = hotelJson.images[0].url
      }
        if(hotelJson.images[1] !== undefined){
        hotelEntity.bigImage = hotelJson.images[1].url;
      }
//star rating
        if(hotelJson.awards[0] !== undefined){
          hotelEntity.starRating = hotelJson.awards[0].rating;
      }
//coordinates
        hotelEntity.latitude = hotelJson.location.latitude;
        hotelEntity.longitude = hotelJson.location.longitude;
        return hotelEntity;

}


Package.prototype.createFlightHotelPackage = function(flightPackage, hotel, finalPrice){
  const flightHotelPackage = new FlightHotelPackage(flightPackage, hotel, finalPrice);
  return flightHotelPackage;
}



Package.prototype.searchForFlightHotelPackages = function(req){

  this.amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
  this.amadeusAPI.onFlightsUpdate = function(flights){

    if(flights.error === undefined)
    {
      this.flightPackagesArray = this.createFlightPackages(flights);
    }
    else
    {
      this.flightPackagesArray = [];
    }

    this.requestForFlightDone = true;
    if(this.checkRequestsStatus()){
      this.createFlightHotelsPackages();
    }

  }.bind(this)

  this.amadeusAPI.searchHotels(req.query.destination, req.query.departureDate, req.query.returnDate)
  this.amadeusAPI.onHotelsUpdate = function(hotels)
  {
    if(hotels.error === undefined)
    {
      for(hotelJson of hotels["results"]){
        const hotelEntity = this.createHotelEntity(hotelJson)
        this.hotelEntitiesArray.push(hotelEntity);
      }
    }
    else
    {
      this.hotelEntitiesArray = [];
    }

    this.requestForHotelDone = true;

    if(this.checkRequestsStatus()){
      this.createFlightHotelsPackages();
    }
  }.bind(this)


  this.photoModel.getListOfPhotosForHotel(200);
  this.photoModel.onUpdateHotelPhotos = function(hotelPhotos){
    this.hotelImagesArray = hotelPhotos;

    this.requestForHotelPhotos = true;

    if(this.checkRequestsStatus()){
      this.createFlightHotelsPackages();
    }
  }.bind(this)


  this.descriptionAPI.getShortDescrition()
  this.descriptionAPI.onUpdateDescription = function(descriptions){

    if(Array.isArray(descriptions))
    {
        descriptions.forEach(function(description){
        this.hotelDescriptionArray.push(description.quote+" "+description.author);
      }.bind(this));
    }
    else
    {
      this.hotelDescriptionArray.push("No description found");
    }

    this.requestForDescription = true;

    if(this.checkRequestsStatus()){
      this.createFlightHotelsPackages();
    }
  }.bind(this)

  this.amadeusAPI.searchAirportLocation(req.query.destination);
  this.amadeusAPI.onAirportLocationUpdate = function(airportsRoot){

    if(airportsRoot.error === undefined)
    {
      this.destinationAirportLatitude  = airportsRoot.airports[0].location.latitude;
      this.destinationAirportLongitude = airportsRoot.airports[0].location.longitude;
    }
    else
    {
      this.destinationAirportLatitude  = 0;
      this.destinationAirportLongitude = 0;
    }

    this.requestForAirportLocation = true;
    if(    this.requestForFlightDone
        && this.requestForHotelDone
        && this.requestForHotelPhotos
        && this.requestForDescription){
          this.createFlightHotelsPackages();
    }
  }.bind(this);
}

Package.prototype.createFlightHotelsPackages = function(){

  this.hotelEntitiesArray.forEach(function(hotel)
  {
    let indexHotelImage       = Math.floor(Math.random() * this.hotelImagesArray.length-1);
    let indexHotelDescription = Math.floor(Math.random() * this.hotelDescriptionArray.length-1);
    if(indexHotelImage > 0)
    {
      hotel.smallImage    = this.hotelImagesArray[indexHotelImage];
      hotel.bigImage      = this.hotelImagesArray[indexHotelImage];
      hotel.description   = this.hotelDescriptionArray[indexHotelDescription];
    }

    const flightPackage = this.flightPackagesArray[0];
    const flightPrice   = parseFloat(flightPackage.flightPrice);
    const hotelPrice    = parseFloat(hotel.hotelPrice);
    const packagePrice  = flightPrice + hotelPrice;
    const package       = this.createFlightHotelPackage(flightPackage, hotel, packagePrice)

    this.flightHotelPackagesArray.push(package);
  }.bind(this));

  let flightHotelPackages = new FlightHotelPackages(this.flightHotelPackagesArray, this.flightPackagesArray, this.destinationAirportLatitude, this.destinationAirportLongitude);
  this.onflightHotelPackagesArrayUpdate(flightHotelPackages);
}


module.exports = Package;
