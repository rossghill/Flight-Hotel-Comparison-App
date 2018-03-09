const FlightHotelPackagesModel = function(flightHotelPackages)
{
  this.flightHotelPackages = flightHotelPackages;
}

FlightHotelPackagesModel.prototype.getPriceMin = function(){
  let priceMin = 0;
  this.flightHotelPackages.forEach(function(travelPackage){
    if(priceMin === 0 || travelPackage.packagePrice <= priceMin){
      priceMin = travelPackage.packagePrice;
    }
  });
  return priceMin;
}

FlightHotelPackagesModel.prototype.getPriceMax = function(){
  let priceMax = 0;
  this.flightHotelPackages.forEach(function(travelPackage){
    if(priceMax === 0 || travelPackage.packagePrice >= priceMax){
      priceMax = travelPackage.packagePrice;
    }
  });
  return priceMax;
}

FlightHotelPackagesModel.prototype.filterTravelPackages = function(filters){

  let travelPackageFiltered = this.flightHotelPackages;

  travelPackageFiltered = travelPackageFiltered.filter(function(travelPackage){
    return Math.floor(travelPackage.packagePrice) <= Math.floor(filters.budgetMax);
  });

  if(filters.hotelName != "")
  {
    travelPackageFiltered = travelPackageFiltered.filter(function(travelPackage){
      return travelPackage.hotel.hotelName.toLowerCase().includes(filters.hotelName.toLowerCase());
    });
  };

  let nbStarRatingsActive = filters.starRating.filter(function(rating){
    return rating.checked;
  }).length;

  if(nbStarRatingsActive > 0)
  {
    filters.starRating.forEach(function(rating){
      if(! rating.checked)
      {
        travelPackageFiltered = travelPackageFiltered.filter(function(travelPackage){
          return travelPackage.hotel.starRating !== rating.value;
        });
      }
    });
  }

  if(filters.sortTravelPackage === "price-asc")
  {
    travelPackageFiltered = travelPackageFiltered.sort(function(travelPackageA, travelPackageB){
      return travelPackageA.packagePrice >= travelPackageB.packagePrice;
    });
  }
  else if(filters.sortTravelPackage === "price-desc")
  {
    travelPackageFiltered = travelPackageFiltered.sort(function(travelPackageA, travelPackageB){
      return travelPackageA.packagePrice <= travelPackageB.packagePrice;
    });
  }
  else if(filters.sortTravelPackage === "startRating-desc")
  {
    travelPackageFiltered = travelPackageFiltered.sort(function(travelPackageA, travelPackageB){
      return travelPackageA.hotel.starRating <= travelPackageB.hotel.starRating;
    });
  }
  else if(filters.sortTravelPackage === "startRating-asc")
  {
    travelPackageFiltered = travelPackageFiltered.sort(function(travelPackageA, travelPackageB){
      return travelPackageA.hotel.starRating >= travelPackageB.hotel.starRating;
    });
  }
  else
  {
    travelPackageFiltered = travelPackageFiltered.sort(function(travelPackageA, travelPackageB){
      return travelPackageA.packagePrice <= travelPackageB.packagePrice;
    });
  }

  return travelPackageFiltered;
}



module.exports = FlightHotelPackagesModel;
