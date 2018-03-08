const ServerRequest = require('./../requests/serverRequest')
const ApiKey        = require('./apiKey');


const PixabayAPI = function(){
  this.pixabayApiKey       = new ApiKey().getPixabayAPIKey();
  this.onUpdateHotelPhotos = null;
}



PixabayAPI.prototype.searchHotelPhotos = function(resultsCount){

  let url = `https://pixabay.com/api/?key=${this.pixabayApiKey}`;
  url += "&image_type=photo";
  url += "&orientation=horizontal";
  url += "&category=travel";
  url += "&q=hotel+nature";
  url += "&min-width=300";
  url += "&min-height=300";
  url += `&per_page=${resultsCount}`;
  url += "&safesearch=true";

  let request = new ServerRequest();
  request.sendRequest(url, function(requestResponse){
    this.onUpdateHotelPhotos(JSON.parse(requestResponse));
  }.bind(this));
}


module.exports = PixabayAPI;
