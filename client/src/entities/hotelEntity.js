const HotelEntity = function(hotelDetails){

  this.hotelName = hotelDetails.hotelName;
  // this.address = hotelDetails.address;
  // this.numberOfNights = hotelDetails.numberOfNights;
  // this.roomType = hotelDetails.roomType;
  this.price = hotelDetails.price;
  this.currency = hotelDetails.currency;
  this.amenities = hotelDetails.amenities;
  this.description = hotelDetails.description;
  this.smallImage = hotelDetails.smallImage;
  this.bigImage = hotelDetails.bigImage;
  this.starRating = hotelDetails.starRating;
  this.latitude = hotelDetails.latitude;
  this.longitude = hotelDetails.longitude;

}

module.exports = HotelEntity;
