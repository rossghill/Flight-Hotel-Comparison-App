const ClientRequest = function(){

}


ClientRequest.prototype.sendRequestGetFlight = function(callBack) {
  const request = new XMLHttpRequest()
  request.open("GET", "http://localhost:3000/flights");
  request.addEventListener("load", callBack);
  request.send();
}


module.exports = ClientRequest;
