const FavouritesList  = require('./../requests/favouritesList');
const MapView         = require('./mapView');
const DOMHelper       = require("./../entities/helpers/DOMHelper");


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


MiniMapView.prototype.createFaveButton = function(flightHotelPackage) {
  const favouritesList  = new FavouritesList("http://localhost:3000/favourites");
  let minimapFooter     = domHelper.createDivElement("div-minimap-footer");
  let button            = document.createElement("button");
  minimapFooter.appendChild(button);

  if(flightHotelPackage._id === undefined)
  {
    button.classList.add("button-pink-bg");
    button.innerText = "ADD TO FAVOURITES !"

    button.addEventListener("click", function(){
      favouritesList.post(createRequestComplete, flightHotelPackage);
    });

  }
  else
  {

    button.innerText = 'DELETE';
    button.addEventListener('click', function(){
      favouritesList.delete(flightHotelPackage._id);
    });
  }

  return minimapFooter;
}

const createRequestComplete = function(newFavourite){
  console.log("New Favourite: " + newFavourite);
}


MiniMapView.prototype.createMiniMapView = function(flightHotelPackage) {
  let miniMapView = document.createElement("div")
  miniMapView.classList.add("section-mini-map")

  let miniMapDiv        = this.createMiniMap(flightHotelPackage)
  let faveActionButton  = this.createFaveButton(flightHotelPackage)

  miniMapView.appendChild(miniMapDiv)
  miniMapView.appendChild(faveActionButton)

  return miniMapView;
}



module.exports = MiniMapView;
