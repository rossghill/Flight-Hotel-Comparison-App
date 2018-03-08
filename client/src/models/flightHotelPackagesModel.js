const FlightHotelPackagesModel = function(flightHotelPackages)
{
  this.flightHotelPackages = flightHotelPackages;
}

FlightHotelPackagesModel.prototype.getPriceMin = function(){
  let priceMin = 0;
  this.flightHotelPackages.forEach(function(travelPackage){
    if(priceMin == 0 || travelPackage.packagePrice < priceMin){
      priceMin = travelPackage.packagePrice;
    }
  });
  return priceMin;
}

FlightHotelPackagesModel.prototype.getPriceMax = function(){
  let priceMax = 0;
  this.flightHotelPackages.forEach(function(travelPackage){
    if(priceMax == 0 || travelPackage.packagePrice > priceMax){
      priceMax = travelPackage.packagePrice;
    }
  });
  return priceMax;
}

FlightHotelPackagesModel.prototype.filterTravelPackages = function(filters){
  let travelPackageFiltered = this.flightHotelPackages;
  travelPackageFiltered = this.flightHotelPackages.filter(function(travelPackage){
    return travelPackage.packagePrice <= filters.budgetMax;
  });
  return travelPackageFiltered;
}



module.exports = FlightHotelPackagesModel;
