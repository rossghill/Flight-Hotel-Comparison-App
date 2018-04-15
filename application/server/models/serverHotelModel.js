const HotelEntity = require("./../../client/src/entities/hotelEntity");

const ServerHotelModel = function(){

}

ServerHotelModel.prototype.createHotelEntityDefaults = function(){

  const hotelEntityJson = {
  "hotelName": "",
  // hotelEntity.address = "";
  // hotelEntity.numberOfNights = 0;
  // hotelEntity.roomType = "";
  "hotelPrice": 0,
  "currency": "",
  "amenities": [],
  "description": "",
  "smallImage": "",
  "bigImage": "",
  "starRating": "",
  "latitude": 0,
  "longitude": 0}

  let hotelEntity = new HotelEntity(hotelEntityJson);
  return hotelEntity;
}


module.exports = ServerHotelModel;
