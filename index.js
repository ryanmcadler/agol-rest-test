var request = require('request');

var tokenURL = "https://www.arcgis.com/sharing/rest/oauth2/token/";
var tokenParams = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: 'client_credentials'
};

var applyEditsURL = 'https://services1.arcgis.com/CHRAD8xHGZXuIQsJ/arcgis/rest/services/Incident_Monitor_Pin_Test/FeatureServer/0/applyEdits'
var edits = [
  {
    'geometry':{'x':-122.61806,'y': 39.43288},
    'attributes':{
      'NAME':'Node test fire 3'
    }
  }
];

request.post({ url: tokenURL, formData: tokenParams }, function(err, res, body) {

  if(!err && res.statusCode == 200) {
    var response = JSON.parse(body);
    var params = {
      form: {
        adds: JSON.stringify(edits),
        token: response.access_token,
        f: 'json'
      }
    };

    // make request to ArcGIS Online...
    request.post(applyEditsURL, params, function(err1, res1, body1) {
      if(!err && res.statusCode == 200) {
        return JSON.parse(body1);
      }
    });
  }
});
