const MapWrapper = require('./../../build/map_wrapper')

const MapView   = function(container, centerLat, centerLng, zoomLevel) {
  let coords    = {lat:centerLat, lng:centerLng};
  this.map      = new MapWrapper(container, coords, zoomLevel);
}

// -----------------------------
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

//
google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
        return function() {
           infowindow.setContent(contentString);
           infowindow.open(giantMap,marker);
        };
    })(marker,content,infowindow));

  });
//
//   // --------------------------
//
//  MapView.prototype.createSmallMap = function(smallMapDiv, hotelEntity)
//  {
//    let centerLat = hotelEntity.latitude;
//    let centerLng = hotelEntity.longitude;
//    let coords    = {lat:centerLat, lng:centerLng};
//    let smallMap  = new MapWrapper(smallMapDiv, coords, 12);
//    smallMap.addMarker(coords);
//
//  }


module.exports = MapView;
