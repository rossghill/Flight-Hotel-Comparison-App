const ServerRequest = require('./../requests/serverRequest')
const ApiKey        = require('./apiKey');

const AmadeusAPI = function(){
  this.amadeusApiKey        = new ApiKey().getAmadeusAPIKey();
  this.numberOfFlightResult = 5;
  this.onFlightsUpdate      = null;
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

AmadeusAPI.prototype.searchHotels = function(){
    let url = `https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=${this.amadeusApiKey}`;
}



module.exports = AmadeusAPI;
