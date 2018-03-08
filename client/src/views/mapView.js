const mapWrapper = require('./../../build/map_wrapper')
// _______________________________
const MapView = function() {

}

let giantMap;

MapView.prototype.crateGiantMap = function(flightHotelPackages){

  let mapDiv = document.getElementById("div-packages-map");

  let hotels = flightHotelPackages.flightHotelPackages;

  centerLat = hotels[0].hotel.latitude;
  centerLng = hotels[0].hotel.longitude;

  let coords = {lat:centerLat, lng:centerLng};
  let giantMap = new MapWrapper(mapDiv, coords, 5);


   hotels.forEach(function(hotel){
     marker = new google.maps.Marker({
       position: new google.maps.LatLng(hotel.latitude, hotel.longitude),
       map: giantMap
     });
   });


module.exports = MapView;
