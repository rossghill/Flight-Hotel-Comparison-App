const PackageView = require('./packageView');

const FavouritesListView = function(){

}

FavouritesListView.prototype.createFavouritesView = function(flightHotelPackage){
  const flightView = new FlightView();
  const flightViewDiv = flightView.createFlightView(flightHotelPackage.flightPackage);

  const hotelView  = new HotelView();
  const hotelViewDiv = hotelView.createHotelView(flightHotelPackage.hotel);

  const miniMapView = new MiniMapView();
  const miniMapViewDiv = miniMapView.createMiniMapView(flightHotelPackage);

  let favouritesViewDiv = document.createElement('div');
  favouritesViewDiv.id = "modal"
  favouritesViewDiv.classList.add('flex-row');
  favouritesViewDiv.classList.add('div-package');

  favouritesViewDiv.appendChild(flightViewDiv);
  favouritesViewDiv.appendChild(hotelViewDiv);
  favouritesViewDiv.appendChild(miniMapViewDiv);

  return favouritesViewDiv;



module.exports = FavouritesListView;
