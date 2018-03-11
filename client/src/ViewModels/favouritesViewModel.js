const FavouritesRequest = require("./../requests/favouritesList");
const DOMHelper         = require("./../entities/helpers/DOMHelper");
const FavouritesListView = require('./../views/favouritesListView');

const FavouritesViewModel = function(){
  this.favouritesRequest = new FavouritesRequest();
  this.domHelper         = new DOMHelper();
  this.initialiseGetFavouritesAction();
}

FavouritesViewModel.prototype.initialiseGetFavouritesAction = function(){
  let buttonGetAllFavourites = document.getElementById("get-favourites-button");
  buttonGetAllFavourites.addEventListener("click", this.sendRequestGetAllFavourites.bind(this));
}

FavouritesViewModel.prototype.sendRequestGetAllFavourites = function(){
  this.favouritesRequest.getAllFavourites(this.displayAllFavourites.bind(this));
}

FavouritesViewModel.prototype.displayAllFavourites = function(favourites){

  const favouritesListView = new FavouritesListView();
  favouritesListView.createFavouritesView(favourites);

  domHelper.createModalWindowForFavourites();
}




module.exports = FavouritesViewModel;
