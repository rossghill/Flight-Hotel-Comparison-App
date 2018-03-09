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

// const InfoWindow = function(text) {
//   this.infoWindow = new google.maps.infoWindow({
//     content: text;
//   });
// }

const addInfoWindow = function(text) {
  const infoWindow = new google.maps.InfoWindow({
    content: text
  })
}

module.exports = MapWrapper;
