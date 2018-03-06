const AmadeusAPI           = require("./../api/AmadeusAPI");

const ServerFlightModel    = require("./../models/serverFlightModel");
const ServerHotelModel    = require("./../models/serverHotelModel");
const PackageModel        = require("./../models/packageModel");
const FlightEntity         = require("./../../client/src/entities/flightEntity");
const HotelEntity         = require("./../../client/src/entities/hotelEntity");
const FlightPackageEntity   = require("./../../client/src/entities/flightPackage");
const FlightHotelPackageEntity = require("./../../client/src/entities/flightHotelPackage");

const express              = require("express");
const searchPageRouter     = new express.Router();



searchPageRouter.get("/search-for-packages", function(req, res){

  let amadeusAPI = new AmadeusAPI();
  let packageModel = new PackageModel();
  let flightPackagesArray = [];

  amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
  amadeusAPI.onFlightsUpdate = function(flights){
    let outbound = flights.results[0].itineraries[0].outbound.flights;
    let inbound = flights.results[0].itineraries[0].inbound.flights;
    let totalPrice = flights.results[0].fare.total_price;
    let flightPackage = packageModel.createFlightPackage(outbound, inbound, totalPrice);
    flightPackagesArray.push(flightPackage);
    }



    amadeusAPI.searchHotels(req.query.destination, req.query.departureDate, req.query.returnDate)
    amadeusAPI.onHotelsUpdate = function(hotels)
    {
      // console.log("searchHotels result");
      let hotelEntities = [];
      for(hotelJson of hotels["results"]){
        // hotelEntities.push(new HotelEntity(hotelJson));
        let hotelDetails = {}
        //hotelDetails["hotelName"] = hotelJson.property_name;
        hotelDetails.hotelName = hotelJson.property_name;
        hotelDetails.price = hotelJson.total_price.amount;
        hotelDetails.currency = hotelJson.total_price.currency;

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
        hotelDetails.amenities = amenitiesArray;
//description
        let descriptionText = ""
        hotelJson.rooms[0].descriptions.forEach(function(textItem){
          descriptionText += textItem + " ";
        });
        hotelDetails.description = descriptionText;

//images
        if(hotelJson.images[0] !== undefined){
        hotelDetails.smallImage = hotelJson.images[0].url
      }
        if(hotelJson.images[1] !== undefined){
        hotelDetails.bigImage = hotelJson.images[1].url;
      }

        if(hotelJson.awards[0] !== undefined){
          hotelDetails.starRating = hotelJson.awards[0].rating;
      }
        // hotelDetails.push(hotelJson.awards[0].rating);
        hotelDetails.latitude = hotelJson.location.latitude;
        hotelDetails.longitude = hotelJson.location.longitude;

        hotelEntities.push(new HotelEntity(hotelDetails));
        console.log(hotelDetails);
      }
      // console.log(flightEntities);
      res.send(hotelEntities);
    }

  }

});


module.exports = searchPageRouter;
