const FlightView = require('./flightView');
const HotelView = require('./hotelView');

const PackageView = function(){

}


PackageView.prototype.createPackageView = function(flightHotelPackage){
  const flightView = new FlightView();
  const flightViewDiv = flightView.createFlightView(flightHotelPackage.flightPackage);

  const hotelView  = new HotelView();
  const hotelViewDiv = hotelView.createHotelView(flightHotelPackage.hotel);

  let packageViewDiv = document.createElement('div');
  packageViewDiv.classList.add('flex-row');

  packageViewDiv.appendChild(flightViewDiv);
  packageViewDiv.appendChild(hotelViewDiv);

  return packageViewDiv;

}

module.exports = PackageView;
