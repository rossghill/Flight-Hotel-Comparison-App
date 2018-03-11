const FavouritesRequest = require("./../requests/favouritesList");
const DOMHelper         = require("./../entities/helpers/DOMHelper");
const FavouritesListView = require('./../views/favouritesListView');

const TravelPackageViewModel = function(){
  this.favouritesRequest = new FavouritesRequest();
  this.domHelper         = new DOMHelper();
  this.initialiseGetFavouritesAction();
}

TravelPackageViewModel.prototype.initialiseGetFavouritesAction = function(){
  let buttonGetAllFavourites = document.getElementById("get-favourites-button");
  buttonGetAllFavourites.addEventListener("click", this.sendRequestGetAllFavourites.bind(this));
}

TravelPackageViewModel.prototype.sendRequestGetAllFavourites = function(){
  this.favouritesRequest.getAllFavourites(this.displayAllFavourites.bind(this));
}

TravelPackageViewModel.prototype.displayAllFavourites = function(favourites){

  const favouritesListView = new FavouritesListView();
  favouritesListView.createFavouritesView(favourites, this);
  domHelper.createModalWindowForFavourites();
}

TravelPackageViewModel.prototype.refreshFavourites = function(){
  this.sendRequestGetAllFavourites();
}



module.exports = TravelPackageViewModel;
