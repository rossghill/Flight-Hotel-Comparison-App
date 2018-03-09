const HotelView = require('./../src/views/hotelView');
const HotelEntity = require('./../src/entities/hotelEntity');

const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'terrain'
  });

  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
      this.markers.push(marker);
}

MapWrapper.prototype.addMarkerWithInfoWindow = function(hotelEntity) {

  let lat = hotelEntity.latitude;
  let lng = hotelEntity.longitude;
  let coords = {lat: lat, lng: lng};

  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });

  let infowindow = new google.maps.InfoWindow();
  let content = new HotelView().createHotelView(hotelEntity);

  this.googleMap.event.addListener(marker,'click', (function(marker,content,infowindow){
          return function() {
             infowindow.setContent(content);
             infowindow.open(this.googleMap,marker);
          };
      }));
  this.markers.push(marker);
}

MapWrapper.prototype.removeAllMarker = function() {
  this.markers.forEach(function(marker){
    marker.setMap(null);
  }.bind(this))
}

const addInfoWindow = function(text) {
  const infoWindow = new google.maps.InfoWindow({
    content: text
  })

module.exports = MapWrapper;
