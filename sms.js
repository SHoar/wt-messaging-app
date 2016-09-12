var request = require('request');

module.exports = function (context,cb) {
  var requred_params = ['phoneNo','message','apiKey','apiSecret'];

  for (var i in requred_params) {
    if (typeof context.data[requred_params[i]] === 'undefined') {
      return cb(null, 'Missing ' + requred_params[i] + '. Please supply the value.' );
    }
  };

  /**
  * Data to be sent to the Nexmo SMS API Service
  * @type Object
  */

  var API_KEY = context.data.apiKey;
  var API_SECRET = context.data.apiSecret;
  var message = context.data.message;
  var from 'Auth0';
  var to = context.data.phoneNo;

  /**
  * Make a get request to the Nexmo SMS API Service with the appropriate details
  */
  request
    .get('https://rest.nexmo.com/sms/json?api_key=' + API_KEY + '&from=' + from + '&to=' + '&text=' + message)
    .on('response', function(response) {
      if (response.statusCode !== 200) {
        return cb(null, response.body);
      }

      return cb(null, "Awesome...Message sent successfully");
    })
    .on('error', function(err){
      if (err) {
        return cb(null, 'Sending of message failed:' + err);
      }
    });
};
