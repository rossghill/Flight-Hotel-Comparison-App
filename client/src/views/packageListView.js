const PackageView = require('./packageView');

const PackageListView = function(){

}

PackageListView.prototype.createPackageList = function(flightHotelPackages){
  const div = document.getElementById("div-packages-list");

  const ul  = document.createElement("ul");
  
  for(flightHotelPackage of flightHotelPackages)
  {
    const packageView = new PackageView();
    const div = packageView.createPackageView(flightHotelPackage);
    let li = document.createElement('li');
    li.appendChild(div);
    ul.appendChild(li);
  }

  div.appendChild(ul);
}

module.exports = PackageListView;
