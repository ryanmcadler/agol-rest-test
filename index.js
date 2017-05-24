var request = require('request');

var tokenURL = "https://www.arcgis.com/sharing/rest/oauth2/token/";
var tokenParams = {
  client_id: 'B1yWH9wx7WwscH8J',
  client_secret: '9aed305482a14ad08a7ea770d8dc32dc',
  grant_type: 'client_credentials'
};

var applyEditsURL = 'https://services1.arcgis.com/CHRAD8xHGZXuIQsJ/arcgis/rest/services/Incident_Monitor_Pin_Test/FeatureServer/0/applyEdits'
var edits = "[{'geometry':{'x':-122.61806,'y':38.43288},'attributes':{'NAME':'Node test fire 2'}}]";

request.post({ url: tokenURL, formData: tokenParams }, function(err, res, body) {

  if(!err && res.statusCode == 200) {
    var response = JSON.parse(body);
    var params = {
      form: {
        adds: edits,
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
