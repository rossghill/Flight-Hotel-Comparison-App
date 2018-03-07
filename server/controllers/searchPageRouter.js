const AmadeusAPI  = require("./../api/AmadeusAPI");
const Package     = require("./../models/packageModel");
const express     = require("express");
const searchPageRouter = new express.Router();



searchPageRouter.get("/search-for-packages", function(req, res){
    let packageModel = new Package();
    packageModel.onflightHotelPackagesArrayUpdate = function(flightHotelPackages){
      console.log(flightHotelPackages);
      res.send(flightHotelPackages);
    }
    packageModel.searchForFlightHotelPackages(req);
})


searchPageRouter.get("/search-airport-cities", function(req, res){
  let amadeusAPI = new AmadeusAPI();
  amadeusAPI.searchAirportCities(req.query.airportCity);
  amadeusAPI.onAirportCitiesUpdate = function(cities){
    res.send(cities);
  }
});


module.exports = searchPageRouter;
