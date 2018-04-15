const MapWrapper = require('./../../build/map_wrapper');
const HotelView  = require('./hotelView');

const MapView   = function(container, centerLat, centerLng, zoomLevel) {
  let coords    = {lat:centerLat, lng:centerLng};
  this.map      = new MapWrapper(container, coords, zoomLevel);
}

MapView.prototype.populateMapWithHotels = function(travelPackages){
 this.map.removeAllMarker();
 travelPackages.forEach(function(travelPackage)
 {
    let centerLat = travelPackage.hotel.latitude;
    let centerLng = travelPackage.hotel.longitude;
    let coords    = {lat:centerLat, lng:centerLng};
    this.map.addMarker(coords);

  }.bind(this));
}

MapView.prototype.populateMapWithHotelsInfoBoxes = function(travelPackages){

 this.map.removeAllMarker();

 travelPackages.forEach(function(travelPackage)
 {
    let centerLat = travelPackage.hotel.latitude;
    let centerLng = travelPackage.hotel.longitude;
    let coords    = {lat:centerLat, lng:centerLng};
    this.map.addMarkerWithInfoWindow(travelPackage.hotel.latitude,
                                     travelPackage.hotel.longitude,
                                     new HotelView().createHotelView(travelPackage.hotel));

  }.bind(this));
}
module.exports = MapView;
