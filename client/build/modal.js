const FavouritesList     = require('./../src/requests/favouritesList');
const FavouritesListView = require('./../src/views/favouritesListView');

const Modal = function(){
}


//Favourites modal:
Modal.prototype.createFavouritesModal = function()
{
  const modal            = document.getElementById('favourites-modal');
  const favouritesButton = document.getElementById('get-favourites-button');
  const close            = document.querySelector('.close')

  const favouritesList = new FavouritesList();

    favouritesButton.addEventListener('click', function(){
      modal.style.display = 'block';
      favouritesList.get(this.getFavouritesListRequestComplete);
    }.bind(this));

    close.addEventListener('click', function(){
      modal.style.display = 'none';
    });

    document.addEventListener('click', function(){
      if(event.target === modal){
        modal.style.display = 'none';
      }
    });
  }

  Modal.prototype.getFavouritesListRequestComplete = function(allFavourites){
    const favourites = new FavouritesListView();
    favourites.createFavouritesView(allFavourites);
  }

  Modal.prototype.updateListOfFavourites = function(){
    console.log("updateListOfFavourites");
  }

  Modal.prototype.openLoadingModal = function(){
    const loadingModal = document.getElementById('modal-loading-packages');
    loadingModal.style.display = 'block';
    document.addEventListener('click', function(){
      if(event.target === loadingModal){
        loadingModal.style.display = 'none';
      }
    });
  }

  Modal.prototype.closeLoadingModal = function(){
    const loadingModal = document.getElementById('modal-loading-packages');
    loadingModal.style.display = 'none';
  }

module.exports = Modal;
