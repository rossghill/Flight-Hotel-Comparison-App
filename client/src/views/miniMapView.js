const FavouritesList = require('./../requests/favouritesList');
const MapView = require('./mapView');

const MiniMapView = function() {

}


MiniMapView.prototype.createMiniMap = function(hotelEntity) {
  let miniMapDiv = document.createElement("div");
  miniMapDiv.classList.add("div-mini-map");
  mapView        = new MapView();
  mapView.createSmallMap(miniMapDiv, hotelEntity);
  return miniMapDiv;
}


MiniMapView.prototype.createFaveButton = function(flightHotelPackage) {
  let faveButton = document.createElement("button")
  faveButton.classList.add("fave-button-class");

  faveButton.innerText = "Add To Favourites!"

  faveButton.addEventListener("click", function(){
    const favouritesList = new FavouritesList("http://localhost:3000/favourites");
    favouritesList.post(createRequestComplete, flightHotelPackage);
  })

  return faveButton;
}


MiniMapView.prototype.createPackagePrice = function(flightHotelPackage) {
  let packagePriceDiv = document.createElement("div")
  packagePriceDiv.classList.add("package-price-class");

  let packagePriceSpan = document.createElement("span");

  packagePriceSpan.innerText  = "\n PACKAGE PRICE: £" + flightHotelPackage.packagePrice.toFixed(2);

  packagePriceDiv.appendChild(packagePriceSpan);



  return packagePriceDiv;
}

MiniMapView.prototype.createMiniMapView = function(flightHotelPackage) {
  let miniMapView = document.createElement("div")
  miniMapView.classList.add("mini-map-view-class")

  let miniMapDiv      = this.createMiniMap(flightHotelPackage.hotel)
  let faveButton      = this.createFaveButton(flightHotelPackage)
  let packagePriceDiv = this.createPackagePrice(flightHotelPackage)

  miniMapView.appendChild(miniMapDiv)
  miniMapView.appendChild(faveButton)
  miniMapView.appendChild(packagePriceDiv)

  return miniMapView;
}



module.exports = MiniMapView;
