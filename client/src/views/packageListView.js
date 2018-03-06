const PackageView = require('./packageView');

const PackageListView = function(){

}

PackageListView.prototype.createPackageList = function(flightHotelPackages){
  const ul = document.getElementById('ul-packages');

  console.log("createPackageList");
  for(flightHotelPackage of flightHotelPackages){
    const packageView = new PackageView();
    const div = packageView.createPackageView(flightHotelPackage);

    console.log("flightHotelPackage");

    let li = document.createElement('li');
    // li.appendChild(div);
    li.innerText = flightHotelPackage;
    ul.appendChild(li);


  }


}

module.exports = PackageListView;
