const HotelView = function(){

}

HotelView.prototype.createHotelDescription = function(hotelEntity){

}

HotelView.prototype.createHotelMap = function(hotelEntity){

}

HotelView.prototype.createHotelPriceAndAddFaveAction = function(hotelEntity){

}

HotelView.prototype.createHotelView = function(hotelEntity){
  this.createHotelDescription(hotelEntity);
  this.createHotelMap(hotelEntity);
  this.createHotelPriceAndAddFaveAction(hotelEntity);
}


module.exports = HotelView;
