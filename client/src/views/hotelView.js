const HotelView = function(){

}

HotelView.prototype.createHotelImage = function(hotelEntity){
  console.log(hotelEntity);
  let hotelImage = document.createElement("img");
  hotelImage.classList.add("hotel-image-class");

  hotelImage.src = hotelEntity.bigImage;
  return hotelImage;
}

HotelView.prototype.createHotelName = function(hotelEntity){
  let hotelNameDiv  = document.createElement("div");
  hotelNameDiv.classList.add("hotel-name-class")
  let hotelNameSpan = document.createElement("span");

  hotelNameDiv.appendChild(hotelNameSpan);

  hotelNameSpan.innerText = "HOTEL: " + hotelEntity.hotelName;
  return hotelNameDiv;
}

HotelView.prototype.createHotelRating = function(hotelEntity){
  let hotelRatingDiv  = document.createElement("div")
  hotelRatingDiv.classList.add("hotel-rating-class")
  let hotelRatingSpan = document.createElement("span")

  hotelRatingDiv.appendChild(hotelRatingSpan);

  hotelRatingSpan.innerText = hotelEntity.starRating;
  return hotelRatingDiv;
}

HotelView.prototype.createHotelDescription = function(hotelEntity){
  let hotelDescriptionDiv  = document.createElement("div")
  hotelDescriptionDiv.classList.add("hotel-description-class")
  let hotelDescriptionSpan = document.createElement("span")

  hotelDescriptionDiv.appendChild(hotelDescriptionSpan);

  hotelDescriptionSpan.innerText = "ABOUT THIS HOTEL: " + hotelEntity.description;
  return hotelDescriptionDiv;
}

// HotelView.prototype.createHotelMap = function(hotelEntity){
//
// }
//
// HotelView.prototype.createHotelPriceAndAddFaveAction = function(hotelEntity){
//
// }

HotelView.prototype.createHotelAmenities = function(hotelEntity){
  let hotelAmenitiesDiv  = document.createElement("div")
  hotelAmenitiesDiv.classList.add("hotel-amenities-class")
  let hotelAmenitiesSpan = document.createElement("span")

  hotelAmenitiesDiv.appendChild(hotelAmenitiesSpan);

  hotelAmenitiesSpan.innerText = "FACILITIES: " + hotelEntity.amenities;
  return hotelAmenitiesDiv;
}

HotelView.prototype.createHotelPrice = function(hotelEntity){
  console.log(hotelEntity);
  let hotelPriceDiv  = document.createElement("div");
  hotelPriceDiv.classList.add("hotel-price-class");
  let hotelPriceSpan = document.createElement("span");

  hotelPriceDiv.appendChild(hotelPriceSpan);

  hotelPriceSpan.innerText  = "\n HOTEL PRICE: £" + hotelEntity.hotelPrice.toFixed(2);
  return hotelPriceDiv;
}



HotelView.prototype.createHotelView = function(hotelEntity){
  let mainHotelDiv = document.createElement("div")
  mainHotelDiv.classList.add('hotel-class')
  // console.log("createHotelView");
  // console.log(hotelEntity);

  let hotelImageDiv        = this.createHotelImage(hotelEntity);
  let hotelNameDiv         = this.createHotelName(hotelEntity);
  let hotelRatingDiv       = this.createHotelRating(hotelEntity);
  let hotelDescriptionDiv  = this.createHotelDescription(hotelEntity);
  let hotelAmenitiesDiv    = this.createHotelAmenities(hotelEntity);
  let hotelPriceDiv        = this.createHotelPrice(hotelEntity);

  mainHotelDiv.appendChild(hotelImageDiv);
  mainHotelDiv.appendChild(hotelNameDiv);
  mainHotelDiv.appendChild(hotelRatingDiv);
  mainHotelDiv.appendChild(hotelDescriptionDiv);
  mainHotelDiv.appendChild(hotelAmenitiesDiv);
  mainHotelDiv.appendChild(hotelPriceDiv);

  // let hotelMapDiv          = this.createHotelMap(hotelEntity);
  // let hotelPriceAddFaveDiv = this.createHotelPriceAndAddFaveAction(hotelEntity);
  return mainHotelDiv;
}


module.exports = HotelView;
