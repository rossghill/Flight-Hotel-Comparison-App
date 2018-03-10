const DOMHelper = require("./../entities/helpers/DOMHelper");

const HotelView = function(){
  domHelper = new DOMHelper();
}

HotelView.prototype.createHotelImage = function(hotelEntity){
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
  let hotelPriceDiv  = document.createElement("div");
  hotelPriceDiv.classList.add("hotel-price-class");
  let hotelPriceSpan = document.createElement("span");

  hotelPriceSpan.innerText  = "\n HOTEL PRICE: £" + hotelEntity.hotelPrice.toFixed(2);

  hotelPriceDiv.appendChild(hotelPriceSpan);
  return hotelPriceDiv;
}


// HotelView.prototype.createHotelView = function(hotelEntity){
//   let mainHotelDiv = document.createElement("div")
//   mainHotelDiv.classList.add('hotel-class')
//   // console.log("createHotelView");
//   // console.log(hotelEntity);
//
//   let hotelImageDiv        = this.createHotelImage(hotelEntity);
//   let hotelNameDiv         = this.createHotelName(hotelEntity);
//   let hotelRatingDiv       = this.createHotelRating(hotelEntity);
//   let hotelDescriptionDiv  = this.createHotelDescription(hotelEntity);
//   let hotelAmenitiesDiv    = this.createHotelAmenities(hotelEntity);
//   let hotelPriceDiv        = this.createHotelPrice(hotelEntity);
//
//   mainHotelDiv.appendChild(hotelImageDiv);
//   mainHotelDiv.appendChild(hotelNameDiv);
//   mainHotelDiv.appendChild(hotelRatingDiv);
//   mainHotelDiv.appendChild(hotelDescriptionDiv);
//   mainHotelDiv.appendChild(hotelAmenitiesDiv);
//   mainHotelDiv.appendChild(hotelPriceDiv);
//
//   // let hotelMapDiv          = this.createHotelMap(hotelEntity);
//   // let hotelPriceAddFaveDiv = this.createHotelPriceAndAddFaveAction(hotelEntity);
//   return mainHotelDiv;
// }


HotelView.prototype.createHotelView = function(hotelEntity){

  let mainDiv     = domHelper.createDivElement();
  let divHeader   = domHelper.createDivElement("flex-row-flex-center");
  let divBody     = domHelper.createDivElement("flex-row-flex-center");

  divHeader.appendChild(this.createHotelHeader(hotelEntity));
  divBody.appendChild(this.createHotelBody(hotelEntity));

  let divHotelMain = domHelper.createDivElement("div-hotel-main");
  divHotelMain.appendChild(divHeader);
  divHotelMain.appendChild(divBody);

  let divFooter    = this.createHotelFooter(hotelEntity);

  mainDiv.appendChild(divHotelMain);
  mainDiv.appendChild(divFooter);

  return mainDiv;
}

HotelView.prototype.createHotelHeader = function(hotelEntity){
  let mainDiv       = domHelper.createDivElement("flex-row-flex-center");
  let hotelName     = domHelper.createSpan("hotel-name", hotelEntity.hotelName);
  mainDiv.appendChild(hotelName);
  let starRatingDiv = domHelper.createDivElement("flex-row-flex-center");

  if(hotelEntity.starRating == "")
  {
    hotelEntity.starRating = 0;
  }

  let starsCounter = parseInt(hotelEntity.starRating);
  for(indexStar = 0; indexStar < starsCounter; indexStar++){
    let star          = domHelper.createImageElement("star.png", "hotel-header-star-rating");
    starRatingDiv.appendChild(star);
  }
  mainDiv.appendChild(starRatingDiv);
  return mainDiv;
}


HotelView.prototype.createHotelBody = function(hotelEntity){
  let mainDiv       = domHelper.createDivElement("flex-row-flex-center");

  let divLeftPart   = domHelper.createDivElement("flex-column");

  let divImage      = domHelper.createDivElement();
  let image         = domHelper.createImageElementWithSrc(hotelEntity.bigImage, "image-hotel");
  divImage.appendChild(image);
  divLeftPart.appendChild(divImage);

  let divRightPart        = domHelper.createDivElement("div-hotel-right-part");
  let divDescription      = domHelper.createDivElement("flex-column");
  let divHotelDescription = domHelper.createDivElement("hotel-description");

  divDescription.appendChild(divHotelDescription);
  divHotelDescription.appendChild(domHelper.createParagraphe("hotel-description", hotelEntity.description.substring(0, 250)));
  divRightPart.appendChild(divDescription);

  mainDiv.appendChild(divLeftPart);
  mainDiv.appendChild(divRightPart)

  return mainDiv;
}


HotelView.prototype.createHotelFooter = function(hotelEntity){
  let mainDiv          = domHelper.createDivElement("div-hotel-footer");

  let priceDiv         = domHelper.createDivElement("div-hotel-price");
  let priceSpan        = document.createElement("span");
  priceSpan.innerText  = "£ " + hotelEntity.hotelPrice.toFixed(2);
  priceDiv.appendChild(priceSpan);
  mainDiv.appendChild(priceDiv);


  let divHotelAmenities   = domHelper.createDivElement();
  mainDiv.appendChild(divHotelAmenities);
  hotelEntity.amenities.forEach(function(amenity){
    let amenityImage = domHelper.createImageElementWithSrc("./images/amenities/"+amenity+".png", "image-amenity");
    divHotelAmenities.appendChild(amenityImage);
  });



  let packagePriceDiv = document.createElement("div")
  packagePriceDiv.classList.add("div-package-price");
  packagePriceDiv.innerText  = "PACKAGE £" + flightHotelPackage.packagePrice.toFixed(2);


  mainDiv.appendChild(packagePriceDiv);

  return mainDiv;
}





module.exports = HotelView;
