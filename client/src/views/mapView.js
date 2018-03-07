const mapWrapper = require('./../../build/map_wrapper')
// _______________________________
const MapView = function() {

}

let giantMap;

MapView.prototype.createGiantMap = function(hotelPackages){

  let mapDiv = document.getElementById("div-packages-map");

  centerLat = hotelPackages.hotel[0].latitude;
  centerLng = hotelPackages.hotel[0].longitude;

  let coords = {lat:centerLat, lng:centerLng};
  let giantMap = new MapWrapper(mapDiv, coords, 5);


   for (i = 0; i < hotelPackages.length; i++) {
     marker = new google.maps.Marker({
       position: new google.maps.LatLng(hotelPackages.hotel.latitude, hotelPackages.hotel.longitude),
       map: giantMap
     });

}

module.exports = MapView;
