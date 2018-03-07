const ServerRequest = require('./../requests/serverRequest')
const ApiKey        = require('./apiKey');


const PixabayAPI = function(){
  this.pixabayApiKey = new ApiKey().getPixabayAPIKey();
}



AmadeusAPI.prototype.searchHotelPhotos = function(){

  let url = `https://pixabay.com/api/?key=${this.pixabayApiKey}`;
  url += "&image_type=photo";
  url += "&orientation=horizontal";
  url += "&category=travel";
  utl += "&q=hotel";
  url += "&min-width=300"

  let request = new ServerRequest();
  request.sendRequest(url, function(requestResponse){
    this.onFlightsUpdate(JSON.parse(requestResponse));
  }.bind(this));
}
