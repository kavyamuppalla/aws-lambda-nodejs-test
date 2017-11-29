exports.handler = (event, context, callback) => {
	var AWS = require('aws-sdk');

  AWS.config.update({ region: 'us-east-1' });
  var s3 = new AWS.S3({params: {Bucket: 'serverless-pipeline-artifacts'}, region: 'us-east-1'});
  var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
  var lambdaParams = {
      FunctionName : 'sample-nodejs',
      InvocationType : 'RequestResponse',
      LogType : 'None'
  };
  lambda.invoke(lambdaParams, function(err, data) {
    var testResult = "Test Execution completed and tests Failed";
    if (data.StatusCode == 200) {
      console.log("data.StatusCode ==== " + data.StatusCode);
      console.log("Test Passed");
      testResult = "Test Execution completed and all tests Passed";
    }
    console.log("Data ==== " + JSON.stringify(data));
    console.log("Errr ==== " + err);
  });

  //Uploading Result file to S3
  s3.putObject({
    Bucket: 'serverless-pipeline-artifacts',
    Key: 'test-results/sample-node-test-results.txt',
    Body: testResult
  }, function(err, data) {
    console.log("Error ==== " + err);
    console.log("Data ==== " + data);
  });

  callback(null, "SUCCESS");
};