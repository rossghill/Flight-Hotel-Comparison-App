const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'terrain'
  });
}

MapWrapper.prototype.addMarker = function(coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
}

module.exports = MapWrapper;
