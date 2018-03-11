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
        console.log("Server side");
        console.log(error);
        console.log(body);
        callback(`{"error": ${error}}`);
      }
    });
}


module.exports = ServerRequest;
