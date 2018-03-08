const MapWrapper = require('./../../build/map_wrapper')
// _______________________________
const MapView = function() {

}


MapView.prototype.createGiantMap = function(flightHotelPackages){

  let mapDiv = document.getElementById("div-packages-map");


  let centerLat = flightHotelPackages[0].hotel.latitude;
  let centerLng = flightHotelPackages[0].hotel.longitude;

  let coords = {lat:centerLat, lng:centerLng};
  let giantMap = new MapWrapper(mapDiv, coords, 15);

  flightHotelPackages.forEach(function(flightHotelPackage){

     let centerLat = flightHotelPackage.hotel.latitude;
     let centerLng = flightHotelPackage.hotel.longitude;
     let coords = {lat:centerLat, lng:centerLng};
     giantMap.addMarker(coords);

   });
 }


module.exports = MapView;
