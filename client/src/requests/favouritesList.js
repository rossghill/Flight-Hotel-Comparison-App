//when using FavouritesList, pass in http://localhost:3000/favourites as the argument.
const FavouritesList     = function(){
  this.url = "http://localhost:3000/favourites";
}

//GET:
FavouritesList.prototype.get = function(callback){
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 200)
    {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send();
}

//POST:
FavouritesList.prototype.post = function(callback, payload){
  const request = new XMLHttpRequest();
  request.open('POST', this.url)
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener('load', function(){
    if(this.status !== 201){
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });

  //made the payload a value of the key "favourite" to be be passed into the reg.body
  request.send(JSON.stringify({favourite: payload}));

}

//callback:
const createRequestComplete = function(newFavourite){
  favouritesView.addFavourite(newFavourite);
}
//need an addFavourite method on favouritesView!


//DELETE:
FavouritesList.prototype.delete = function(id, callback){
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url + "/" + id);
  request.addEventListener('load', function(){
    if(this.status !== 204){
      return;
    }

    callback();

  });
  request.send();
}


/* Same methods renamed */

FavouritesList.prototype.getAllFavourites = function(callback){
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 200)
    {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send();
}

FavouritesList.prototype.saveFavourite = function(callback, travelPackage){
  const request = new XMLHttpRequest();
  request.open('POST', this.url)
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener('load', function(){
    if(this.status !== 201){
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });

  //made the payload a value of the key "favourite" to be be passed into the reg.body
  request.send(JSON.stringify({favourite: travelPackage}));

}


FavouritesList.prototype.deleteFavourite = function(id, callback){
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url + "/" + id);
  request.addEventListener('load', function(){
    if(this.status !== 204){
      return;
    }

    callback();

  });
  request.send();
}



module.exports = FavouritesList;
