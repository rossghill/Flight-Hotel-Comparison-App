const FlightHotelPackages = function(flightHotelPackages, flightPackages, destinationAirportLatitude, destinationAirportLongitude){
 this.flightHotelPackages         = flightHotelPackages;
 this.flightPackages              = flightPackages;
 this.destinationAirportLatitude  = destinationAirportLatitude;
 this.destinationAirportLongitude = destinationAirportLongitude;
}





FlightHotelPackages.prototype.getPriceMin = function(){
  let priceMin = 0;
  this.flightHotelPackages.forEach(package){
    if(priceMin == 0 || package.packagePrice < priceMin){
      priceMin = package.packagePrice;
    }
  }
  return priceMin;
}

FlightHotelPackages.prototype.getPriceMax = function(){
  let priceMax = 0;
  this.flightHotelPackages.forEach(package){
    if(priceMax == 0 || package.packagePrice > priceMax){
      priceMax = package.packagePrice;
    }
  }
  return priceMax;
}




module.exports = FlightHotelPackages;
