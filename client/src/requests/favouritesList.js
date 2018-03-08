//***WORK IN PROGRESS!***

//when using FavouritesListList, pass in http://localhost:3000/favourites as the argument.

const FavouritesList = function(url){
  this.url = url;
}

//GET:
FavouritesList.prototype.get = function(callback){
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 200) {
    return;
  }
  const responseBody = JSON.parse(this.responseText);
  callback(responseBody);
});
  });
  request.send();
}



//callback: (in app.js or wherever the .get function above is called):
const getFavouritesListRequestComplete = function(allFavouritesList){
  allFavouritesList.forEach(function(favourite){
    favouritesView.addFavourite(favourite);
  });
}
//need to have a favouritesView set up!


//POST:
FavouritesList.prototype.post = function(callback, payload){
  const request = new XMLHttpRequest();
  request.open('POST', this.url)
  request.addEventListener('load', function(){
    if(this.status !== 201){
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(payload));
});
}

//callback:
const createRequestComplete = function(newFavourite){
  favouritesView.addFavourite(newFavourite);
}
//need an addFavourite method on favouritesView!


//DELETE:
FavouritesList.prototype.delete = function(callback){
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 204){
      return;
    }
    callback();
  });
  request.send();
}

module.exports = FavouritesListList;
