
// _______________________________


const mapDiv = getElementById("div-packages-map")
let lat = fhps.flightHotelPackages[0].hotel.latitude;
let lng = fhps.flightHotelPackages[0].hotel.longitude;
let coords = {lat: lat, lng: lng};
let map = new GiantMapWrapper(mapDiv, coords, 5);
map.addMarker(coords);
