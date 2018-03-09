const MapWrapper = require('./../../build/map_wrapper')
// _______________________________
const MapView = function() {

}

// -----------------------------

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
     // giantMap.addMarker(coords);

  var marker = new google.maps.Marker({
          map: giantMap, title: hotel , position: coords
        });
        map.setCenter(marker.getPosition())


  var infowindow = new google.maps.InfoWindow()

google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
        return function() {
           infowindow.setContent(contentString);
           infowindow.open(giantMap,marker);
        };
    })(marker,content,infowindow));

  });

  // --------------------------

 MapView.prototype.createSmallMap = function(smallMapDiv, hotelEntity)
 {
   let centerLat = hotelEntity.latitude;
   let centerLng = hotelEntity.longitude;
   let coords    = {lat:centerLat, lng:centerLng};
   let smallMap  = new MapWrapper(smallMapDiv, coords, 12);
   smallMap.addMarker(coords);

 }


module.exports = MapView;
