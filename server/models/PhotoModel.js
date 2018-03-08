const PixabayAPI = require("./../api/pixabayAPI.js");

const PhotoModel = function(){
  this.onUpdateHotelPhotos = null;
}

PhotoModel.prototype.getListOfPhotosForHotel = function(resultsCount){
  const pixabayAPI  = new PixabayAPI();
  let arrayOfPhotos = [];

  pixabayAPI.onUpdateHotelPhotos = function(photosFromPixabay){

    if(photosFromPixabay != null && photosFromPixabay != undefined && Array.isArray(photosFromPixabay.hits))
    {
        photosFromPixabay.hits.forEach(function(photo){
          arrayOfPhotos.push(photo.webformatURL);
        });
    }

    this.onUpdateHotelPhotos(arrayOfPhotos);

  }.bind(this);

  pixabayAPI.searchHotelPhotos(resultsCount);
}









module.exports = PhotoModel;
