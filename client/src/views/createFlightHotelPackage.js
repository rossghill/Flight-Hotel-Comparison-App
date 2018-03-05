const CreatePackage = function(flightHotelPackage){
  this.createFlightView(flightHotelPackage.flightPackage);
  this.createHotelView(flightHotelPackage.hotel);
}

CreatePackage.prototype.createFlightView = function(flightPackage){

}

CreatePackage.prototype.createHotelView = function(hotel){

}

module.exports = CreatePackage;
