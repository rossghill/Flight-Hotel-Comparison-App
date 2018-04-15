const ServerRequest = require('./../requests/serverRequest')

const DescriptionAPI = function(){

  this.onUpdateDescription = null;
}

DescriptionAPI.prototype.getShortDescrition = function(){
  const url = "https://talaikis.com/api/quotes/"
  let request = new ServerRequest();
    request.sendRequest(url, function(requestResponse){
    this.onUpdateDescription(JSON.parse(requestResponse));
  }.bind(this));
}



module.exports = DescriptionAPI;
