const AmadeusAPI           = require("./../api/AmadeusAPI");
const ServerFlightModel    = require("./../models/serverFlightModel");
const FlightEntity         = require("./../../client/src/entities/flightEntity");
const express              = require("express");
const searchPageRouter     = new express.Router();



searchPageRouter.get("/flights", function(req, res){

   let amadeusAPI = new AmadeusAPI();
   amadeusAPI.searchFlights("EDI", "LON", "2018-04-25", "2018-04-28",1,0);
   amadeusAPI.onFlightsUpdate = function(flights)
   {
     let flightEntities = [];
     for(flightJson of flights["results"]){
       flightEntities.push(new FlightEntity(flightJson));
     }

     res.send(flightEntities);
     console.log("flights");
  }

  // const serverFlightModel = new ServerFlightModel();
  // serverFlightModel.searchFlights("EDI", "LON", "2018-04-25", "2018-04-28",1,0);
  // serverFlightModel.onFlightsUpdate = function(flightEntities){
  //   res.send(flightEntities);
  // }


});


module.exports = searchPageRouter;
