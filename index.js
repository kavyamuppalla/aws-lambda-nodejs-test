exports.handler = (event, context, callback) => {
	var AWS = require('aws-sdk');

  AWS.config.update({ region: 'us-east-1' });
  var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
  var lambdaParams = {
      FunctionName : 'sample-nodejs',
      InvocationType : 'RequestResponse',
      LogType : 'None'
  };
  lambda.invoke(lambdaParams, function(err, data) {
    if (data.StatusCode == 200) {
      console.log("data.StatusCode ==== " + data.StatusCode);
      console.log("Test Passed");
    }
    console.log("Data ==== " + JSON.stringify(data));
    console.log("Errr ==== " + err);
  });

  callback(null, "SUCCESS");
};