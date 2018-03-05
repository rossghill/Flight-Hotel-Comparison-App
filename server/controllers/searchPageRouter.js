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
         hotelEntities.push(new HotelEntity(hotelJson));
       }
       console.log(flightEntities);
       res.send(hotelEntities);
     }

  }

});


module.exports = searchPageRouter;
