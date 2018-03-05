const ServerRequest = require('./../requests/serverRequest')
const ApiKey        = require('./apiKey');

const AmadeusAPI = function(){
  this.amadeusApiKey        = new ApiKey().getAmadeusAPIKey();
  this.numberOfFlightResult = 5;
  this.numberOfHotelResults = 20;
  this.onFlightsUpdate      = null;
  this.onHotelsUpdate        = null;
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

AmadeusAPI.prototype.searchHotels = function(location, checkInDate, checkOutDate, radius){
    let url = `https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=${this.amadeusApiKey}`;
    url += `&location=${location}`;
    url += `&checkInDate=${checkInDate}`;
    url += `&checkOutDate=${checkOutDate}`;
    url += `&radius=${radius}`;
    url += `&numberOfResults=${this.numberOfHotelResults}`;

    let request = new ServerRequest();
    request.sendRequest(url, function(requestResponse){
      this.onHotelsUpdate(JSON.parse(requestResponse));
    }.bind(this));

}



module.exports = AmadeusAPI;
