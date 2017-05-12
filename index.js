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
    console.log('obtained token...', agolToken);

    var serviceUrl = 'https://services1.arcgis.com/CHRAD8xHGZXuIQsJ/arcgis/rest/services/Incident_Monitor_Pin/FeatureServer/0/addFeatures?token=' + agolToken;
    console.log('service url', serviceUrl);

    var payload = {
      f: "json",
      features: [
        {
          attributes : {
            NAME: 'Test Fire',
            STATUS: 5
          },
          geometry : {
            x : -122.61806,
            y : 38.43288
          }
        }
      ]
    };
    console.log('payload', payload)

    request.post({
      url: serviceUrl,
      formData: payload
    }, function(err, resp, body) {
      console.log('API request made...', body);
    });
  }
});
