const MapView         = require('./mapView');
const DOMHelper       = require("./../entities/helpers/DOMHelper");
const FavouritesList  = require("./../requests/favouritesList");

const MiniMapView = function() {
  domHelper = new DOMHelper();
}

MiniMapView.prototype.createMiniMap = function(flightHotelPackage) {
  let miniMapDiv = document.createElement("div");
  miniMapDiv.className="div-mini-map";
  let mapView = new MapView(miniMapDiv,
                            flightHotelPackage.hotel.latitude,
                            flightHotelPackage.hotel.longitude,
                            15);

  mapView.populateMapWithHotels([flightHotelPackage]);

  return miniMapDiv;
}


MiniMapView.prototype.createFaveButton = function(flightHotelPackage, travelPackageViewModel) {
  let minimapFooter     = domHelper.createDivElement("div-minimap-footer");
  let button            = document.createElement("button");
  minimapFooter.appendChild(button);

  favouritesList = new FavouritesList();
  if(flightHotelPackage._id === undefined)
  {
    button.classList.add("button-pink-bg");
    button.innerText = "ADD TO FAVOURITES !"
    button.addEventListener("click", function(){
      //favouritesList.post(createRequestComplete);
      favouritesList.saveFavourite(createRequestComplete, flightHotelPackage);
    });
  }
  else
  {
    button.classList.add("button-grey");
    button.innerText = 'DELETE';
    button.addEventListener('click', function(){
      favouritesList.delete(flightHotelPackage._id, travelPackageViewModel.refreshFavourites.bind(travelPackageViewModel));
    });
  }

  return minimapFooter;
}

const createRequestComplete = function(newFavourite){
  console.log("New Favourite: " + newFavourite);
}


MiniMapView.prototype.createMiniMapView = function(flightHotelPackage, displayMiniMap, travelPackageViewModel) {
  let miniMapView = document.createElement("div")
  miniMapView.classList.add("section-mini-map")

  let miniMapDiv = domHelper.createDivElement();
  if(displayMiniMap)
  {
    miniMapDiv = this.createMiniMap(flightHotelPackage)
  }

  let faveActionButton  = this.createFaveButton(flightHotelPackage, travelPackageViewModel)

  miniMapView.appendChild(miniMapDiv)
  miniMapView.appendChild(faveActionButton)

  return miniMapView;
}



module.exports = MiniMapView;
