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
  console.log(req);
   let amadeusAPI = new AmadeusAPI();
   amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
   amadeusAPI.onFlightsUpdate = function(flights)
   {
     let flightEntities = [];
     for(flightJson of flights["results"]){
       flightEntities.push(new FlightEntity(flightJson));
     }

     res.send(flightEntities);
     // res.send(packagesEntities):
     console.log("flights");
  }

  // const serverFlightModel = new ServerFlightModel();
  // serverFlightModel.searchFlights("EDI", "LON", "2018-04-25", "2018-04-28",1,0);
  // serverFlightModel.onFlightsUpdate = function(flightEntities){
  //   res.send(flightEntities);
  // }


});


module.exports = searchPageRouter;
