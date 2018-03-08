const MiniMapView = function() {

}


MiniMapView.prototype.createMiniMap = function(hotelEntity) {
  let miniMapDiv = document.createElement("div")
  miniMapDiv.classList.add("mini-map-class");


  return miniMapDiv;
}


MiniMapView.prototype.createFaveButton = function() {
  let faveButton = document.createElement("button")
  faveButton.classList.add("fave-button-class");

  faveButton.innerText = "Add To Favourites!"

  faveButton.addEventListener("click", function(){
    console.log("THIS BUTTON WORKS!");

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
  let faveButton   = this.createFaveButton(flightHotelPackage)
  let packagePriceDiv = this.createPackagePrice(flightHotelPackage)

  miniMapView.appendChild(miniMapDiv)
  miniMapView.appendChild(faveButton)
  miniMapView.appendChild(packagePriceDiv)


  return miniMapView;
}



module.exports = MiniMapView;
