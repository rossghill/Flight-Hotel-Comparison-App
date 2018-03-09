const MapWrapper = require('./../../build/map_wrapper')

const MapView   = function(container, centerLat, centerLng, zoomLevel) {
  let coords    = {lat:centerLat, lng:centerLng};
  this.map      = new MapWrapper(container, coords, zoomLevel);
}

MapView.prototype.populateMapWithHotels = function(travelPackages){
 this.removeAllMarkers();
 travelPackages.forEach(function(travelPackage)
 {
    let centerLat = travelPackage.hotel.latitude;
    let centerLng = travelPackage.hotel.longitude;
    let coords    = {lat:centerLat, lng:centerLng};
    this.map.addMarker(coords);
  }.bind(this));
}


MapView.prototype.removeAllMarkers = function(){
  this.map.removeAllMarker();
}


module.exports = MapView;
