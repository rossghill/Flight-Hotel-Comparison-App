const AmadeusAPI = require("./../api/AmadeusAPI");

const ServerFlightModel = require("./../models/serverFlightModel");
const ServerHotelModel = require("./../models/serverHotelModel");
const Package = require("./../models/packageModel");
const FlightEntity = require("./../../client/src/entities/flightEntity");
const HotelEntity = require("./../../client/src/entities/hotelEntity");
const FlightPackageEntity = require("./../../client/src/entities/flightPackage");
const FlightHotelPackageEntity = require("./../../client/src/entities/flightHotelPackage");

const express = require("express");
const searchPageRouter = new express.Router();



searchPageRouter.get("/search-for-packages", function(req, res){

  let amadeusAPI = new AmadeusAPI();
  let packageModel = new Package();
  let flightPackagesArray = [];

  amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
  amadeusAPI.onFlightsUpdate = function(flights){
    flights.results.forEach(function(flight){
      let outbound = flight.itineraries[0].outbound.flights;
      let inbound = flight.itineraries[0].inbound.flights;
      let totalPrice = flight.fare.total_price;
      let flightPackage = packageModel.createFlightPackage(outbound, inbound, totalPrice);
      flightPackagesArray.push(flightPackage);
    });
    }



    amadeusAPI.searchHotels(req.query.destination, req.query.departureDate, req.query.returnDate)
    amadeusAPI.onHotelsUpdate = function(hotels)
    {
      let hotelEntitiesArray = [];
      for(hotelJson of hotels["results"]){
        const hotelEntity = packageModel.createHotelEntity(hotelJson)
        hotelEntitiesArray.push(hotelEntity);
      }
      // console.log(flightEntities);
      res.send(hotelEntitiesArray);
    }



});


module.exports = searchPageRouter;
