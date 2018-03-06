//add Package model
//require Hotel model in searchPageRouter

const HotelEntity = require("./../../client/src/entities/hotelEntity");

const Package = function(){


}

Package.prototype.createHotelEntity = function () {

let hotelDetails = {}
//hotelDetails["hotelName"] = hotelJson.property_name;
        hotelDetails.hotelName = hotelJson.property_name;
        hotelDetails.price = hotelJson.total_price.amount;
        hotelDetails.currency = hotelJson.total_price.currency;

//amenities
        let amenitiesArray = []
        hotelJson.amenities.forEach(function(amenity){
          if(amenity.amenity === "INTERNET_PUBLIC_AREAS"){
            amenitiesArray.push("INTERNET_PUBLIC_AREAS");
          } else if(amenity.amenity === "RESTAURANT"){
            amenitiesArray.push("RESTAURANT");
          } else if(amenity.amenity === "PARKING"){
            amenitiesArray.push("PARKING");
          } else if(amenity.amenity === "POOL"){
            amenitiesArray.push("POOL");
          } else if(amenity.amenity === "ACCESSIBLE_FACILITIES"){
            amenitiesArray.push("ACCESSIBLE_FACILITIES");
          }
        });
        hotelDetails.amenities = amenitiesArray;
//description
        let descriptionText = ""
        hotelJson.rooms[0].descriptions.forEach(function(textItem){
          descriptionText += textItem + " ";
        });
        hotelDetails.description = descriptionText;

//images
        if(hotelJson.images[0] !== undefined){
        hotelDetails.smallImage = hotelJson.images[0].url
      }
        if(hotelJson.images[1] !== undefined){
        hotelDetails.bigImage = hotelJson.images[1].url;
      }
//star rating
        if(hotelJson.awards[0] !== undefined){
          hotelDetails.starRating = hotelJson.awards[0].rating;
      }
//coordinates
        hotelDetails.latitude = hotelJson.location.latitude;
        hotelDetails.longitude = hotelJson.location.longitude;

        const newHotel = new HotelEntity(hotelDetails);
        return newHotel;
}

module.exports = Package;
