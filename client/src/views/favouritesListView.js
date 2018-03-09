const PackageView = require('./packageView');

const FavouritesListView = function(){

}

FavouritesListView.prototype.createFavouritesView = function(flightHotelPackages, displayMinimap){
  const div = document.querySelector(".modal-body");
  div.innerHTML = "";
  const ul  = document.createElement("ul");

  for(flightHotelPackage of flightHotelPackages)
  {
    const packageView = new PackageView();
    const div = packageView.createPackageView(flightHotelPackage, displayMinimap);
    let li = document.createElement('li');
    li.appendChild(div);
    ul.appendChild(li);
  }

  div.appendChild(ul);
}




module.exports = FavouritesListView;
