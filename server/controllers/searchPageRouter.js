const AmadeusAPI           = require("./../api/AmadeusAPI");

const ServerFlightModel    = require("./../models/serverFlightModel");
const ServerHotelModel    = require("./../models/serverHotelModel");

const FlightEntity         = require("./../../client/src/entities/flightEntity");
const HotelEntity         = require("./../../client/src/entities/hotelEntity");
const FlightPackageEntity   = require("./../../client/src/entities/flightPackage");
const FlightHotelPackageEntity = require("./../../client/src/entities/flightHotelPackage");

const express              = require("express");
const searchPageRouter     = new express.Router();



searchPageRouter.get("/search-for-packages", function(req, res){

   let amadeusAPI = new AmadeusAPI();
   amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
   amadeusAPI.onFlightsUpdate = function(flights){
     let flightEntities = [];
     for(flightJson of flights["results"]){
       flightEntities.push(new FlightEntity(flightJson));
     }

     amadeusAPI.searchHotels(req.query.destination, req.query.departureDate, req.query.returnDate)
     amadeusAPI.onHotelsUpdate = function(hotels)
     {
       console.log("searchHotels result");
       let hotelEntities = [];
       for(hotelJson of hotels["results"]){
         // hotelEntities.push(new HotelEntity(hotelJson));
         let hotelDetails = []
         hotelDetails.push(hotelJson.property_name);
         hotelDetails.push(hotelJson.total_price.amount);
         hotelDetails.push(hotelJson.total_price.currency);
         let amenitiesArray = []
         hotelJson.forEach(function(hotel, index){
           if(hotel.amenities[index].amenity === "INTERNET_PUBLIC_AREAS"){
             amenitiesArray.push("INTERNET_PUBLIC_AREAS");
           } else if(hotel.amenities[index].amenity === "RESTAURANT"){
             amenitiesArray.push("RESTAURANT");
           } else if(hotel.amenities[index].amenity === "PARKING"){
             amenitiesArray.push("PARKING");
           } else if(hotel.amenities[index].amenity === "POOL"){
             amenitiesArray.push("POOL");
           } else if(hotel.amenities[index].amenity === "ACCESSIBLE_FACILITIES"){
             amenitiesArray.push("ACCESSIBLE_FACILITIES");
           }
         });
         hotelDetails.push(amenitiesArray);
         // hotelDetails.push(); description
         hotelDetails.push(hotelJson.images[0].url);
         hotelDetails.push(hotelJson.images[1].url);
         hotelDetails.push(hotelJson.awards[0].rating);
         hotelDetails.push(hotelJson.location.latitude);
         hotelDetails.push(hotelJson.location.longitude);

         hotelEntities.push(new HotelEntity(hotelDetails));
       }
       console.log(flightEntities);
       console.log(hotelEntities[0]);
       res.send(hotelEntities);
     }

  }

});


module.exports = searchPageRouter;
