const MapWrapper = require('./../../build/map_wrapper')
// _______________________________
const MapView = function() {

}


MapView.prototype.createGiantMap = function(flightHotelPackagesEntity){

  let mapDiv    = document.getElementById("div-packages-map");

  let centerLat = flightHotelPackagesEntity.destinationAirportLatitude;
  let centerLng = flightHotelPackagesEntity.destinationAirportLongitude;

  let coords = {lat:centerLat, lng:centerLng};
  let giantMap = new MapWrapper(mapDiv, coords, 12);

  flightHotelPackagesEntity.flightHotelPackages.forEach(function(flightHotelPackage){

    let contentString = "Info goes here";

     let centerLat = flightHotelPackage.hotel.latitude;
     let centerLng = flightHotelPackage.hotel.longitude;
     let coords = {lat:centerLat, lng:centerLng};
     giantMap.addMarker(coords);

     var contentString = 'test';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: giantMap,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

   });

 MapView.prototype.createSmallMap = function(smallMapDiv, hotelEntity)
 {
   console.log(hotelEntity);

   let centerLat = hotelEntity.latitude;
   let centerLng = hotelEntity.longitude;
   let coords    = {lat:centerLat, lng:centerLng};
   let smallMap  = new MapWrapper(smallMapDiv, coords, 12);
   smallMap.addMarker(coords);

 }


module.exports = MapView;
