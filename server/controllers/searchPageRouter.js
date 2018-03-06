const AmadeusAPI = require("./../api/AmadeusAPI");
const Package = require("./../models/packageModel");
const FlightHotelPackages = require("./../../client/src/entities/flightHotelPackages");

const express = require("express");
const searchPageRouter = new express.Router();



searchPageRouter.get("/search-for-packages", function(req, res){

  let amadeusAPI = new AmadeusAPI();
  let packageModel = new Package();
  let flightPackagesArray = [];
  let hotelEntitiesArray = [];
  let flightHotelPackagesArray = [];

  amadeusAPI.searchFlights(req.query.origin, req.query.destination, req.query.departureDate, req.query.returnDate, req.query.adults, req.query.children);
  amadeusAPI.onFlightsUpdate = function(flights){
    flightPackagesArray = packageModel.createFlightPackages(flights);

    amadeusAPI.searchHotels(req.query.destination, req.query.departureDate, req.query.returnDate)
    amadeusAPI.onHotelsUpdate = function(hotels)
    {
      for(hotelJson of hotels["results"]){
        const hotelEntity = packageModel.createHotelEntity(hotelJson)
        hotelEntitiesArray.push(hotelEntity);
      }
      hotelEntitiesArray.forEach(function(hotel){
        const flightPackage = flightPackagesArray[0];
        const flightPrice = parseFloat(flightPackage.flightPrice);
        const hotelPrice = parseFloat(hotel.hotelPrice);
        const packagePrice = flightPrice + hotelPrice;
        const package = packageModel.createFlightHotelPackage(flightPackage, hotel, packagePrice)
        flightHotelPackagesArray.push(package);
      });
      let flightHotelPackages = new FlightHotelPackages(flightHotelPackagesArray, flightPackagesArray);
      // console.log(JSON.stringify(flightHotelPackage));
      res.send(flightHotelPackages);
    }
  }


});


module.exports = searchPageRouter;
