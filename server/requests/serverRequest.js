const ServerRequest = function(){

}


ServerRequest.prototype.sendRequest = function(url, callback){
  let request = require('request');
  request.get(
    {
      url: url
    },
    function (error, response, body) {

      if(!error && response.statusCode == 200)
      {
        callback(body);
      }
      else
      {
        console.log(error);
        callback({"error": error});
      }
    });
}


module.exports = ServerRequest;
