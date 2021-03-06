const ServerRequest = require('./../requests/serverRequest')
const ApiKey        = require('./apiKey');

const AmadeusAPI = function(){
  this.amadeusApiKey        = new ApiKey().getAmadeusAPIKey();
  this.numberOfFlightResult = 3;
  this.numberOfHotelResults = 10;
  this.radius               = 10;
  this.onFlightsUpdate      = null;
  this.onHotelsUpdate       = null;
  this.onAirportCitiesUpdate = null;
  this.onAirportLocationUpdate = null;
}


AmadeusAPI.prototype.searchFlights = function(airportFrom, airportTo, departureDate, returnDate, adults, children){

    let url = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${this.amadeusApiKey}`;
    url += `&origin=${airportFrom}`;
    url += `&destination=${airportTo}`;
    url += `&departure_date=${departureDate}`;
    url += `&return_date=${returnDate}`;
    url += `&adults=${adults}`;
    url += `&children=${children}`;
    url += `&number_of_results=${this.numberOfFlightResult}`

    let request = new ServerRequest();
    request.sendRequest(url, function(requestResponse){
      this.onFlightsUpdate(JSON.parse(requestResponse));
    }.bind(this));
}

AmadeusAPI.prototype.searchHotels = function(location, checkInDate, checkOutDate){
    let url = `https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=${this.amadeusApiKey}`;
    url += `&location=${location}`;
    url += `&check_in=${checkInDate}`;
    url += `&check_out=${checkOutDate}`;
    url += `&radius=${this.radius}`;
    url += `&number_of_results=${this.numberOfHotelResults}`;

    let request = new ServerRequest();
    request.sendRequest(url, function(requestResponse){
      this.onHotelsUpdate(JSON.parse(requestResponse));
    }.bind(this));

}


AmadeusAPI.prototype.searchAirportCities = function(cityAirport){
    let url = `https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${this.amadeusApiKey}&term=${cityAirport}`;
    let request = new ServerRequest();
    request.sendRequest(url, function(requestResponse){
      this.onAirportCitiesUpdate(JSON.parse(requestResponse));
    }.bind(this));
}

AmadeusAPI.prototype.searchAirportLocation = function(IATAcode){
  let url = `https://api.sandbox.amadeus.com/v1.2/location/${IATAcode}?apikey=${this.amadeusApiKey}`;
  let request = new ServerRequest();
  request.sendRequest(url, function(requestResponse){
    this.onAirportLocationUpdate(JSON.parse(requestResponse));
  }.bind(this));
}






module.exports = AmadeusAPI;
