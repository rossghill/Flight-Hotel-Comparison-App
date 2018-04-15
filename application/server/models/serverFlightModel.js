const AmadeusAPI    = require("../api/amadeusAPI");
const FlightEntity  = require("./../../client/src/entities/flightEntity");

const ServerFlightModel = function(){
   this.onUpdate = null;
}


ServerFlightModel.prototype.searchFlights = function(airportFrom, airportTo, departureDate, returnDate, adults, children){

  let amadeusAPI = new AmadeusAPI();
  amadeusAPI.searchFlights(airportFrom, airportTo, departureDate, returnDate, adults, children);

  amadeusAPI.onFlightsUpdate = function(flights)
  {
    let flightEntities = [];
    for(flightJson of flights["results"]){
      flightEntities.push(new FlightEntity(flightJson));
    }
    this.onUpdate(flightEntities);
  }.bind(this)

}

module.exports = ServerFlightModel;
