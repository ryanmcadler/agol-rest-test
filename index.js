var request = require('request');

request.post({
  url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
  formData: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'client_credentials'
  }
}, function(err, resp, body) {
  var agolToken = null;

  if (err !== null) {
    console.log('Could not obtain token', err);
  } else {

    agolToken = JSON.parse(body).access_token;

    //var serviceUrl = 'http://services1.arcgis.com/CHRAD8xHGZXuIQsJ/arcgis/rest/services/Incident_Monitor_Pin/FeatureServer/0/addFeatures';
    var serviceUrl = 'https://services1.arcgis.com/CHRAD8xHGZXuIQsJ/arcgis/rest/services/Incident_Monitor_Pin_Test/FeatureServer/0/addFeatures'

    var payload = [
      {
        "attributes" : {
          "NAME": "Test Fire"
        },
        "geometry" : {
          "x" : 122.61806,
          "y" : 38.43288
        }
      }
    ];

    request.post({
      url: serviceUrl,
      method: 'POST',
      json: true,
      form: {
       f: 'json',
       token: agolToken,
       features: payload
      }
    }, function(error, response, body) {
      console.log(body);
    });

  }
});
