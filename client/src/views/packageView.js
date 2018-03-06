const FlightView = require('./flightView');
const HotelView = require('./hotelView');

const PackageView = function(){

}


PackageView.prototype.createPackageView = function(flightHotelPackage){
  const flightView = new FlightView();
  const flightViewDiv = flightView.createFlightView(flightHotelPackage.flightPackage);

  const hotelView  = new HotelView();
  const hotelViewDiv = hotelView.createHotelView(flightHotelPackage.hotel);

  let div = document.createElement('div');
  div.classList.add('flex-row');
  div.appendChild(flightView);
  div.appendChild(hotelView);

  return div;

}

module.exports = PackageView;
