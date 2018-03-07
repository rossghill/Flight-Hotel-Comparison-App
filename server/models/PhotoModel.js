const PixabayAPI = require("./../api/pixabayAPI.js");

const PhotoModel = function(){

}

PhotoHotelModel.prototype.GetListOfPhotosForHotel = function(){
  const pixabayAPI  = new PixabayAPI();
  let arrayOfPhotos = [];

  pixabayAPI.onUpdateHotelPhotos = function(photosFromPixabay){
    if(photosFromPixabay != null && photosFromPixabay != undefined && Array.isArray(photosFromPixabay.hists))
    {
      photosFromPixabay.hists.forEach(function(photo){
        arrayOfPhotos.push(photo.webformatURL);
      });
    }

    return arrayOfPhotos;
  }

  pixabayAPI.GetListOfPhotosForHotel();
}









module.exports = PhotoHotelModel;
