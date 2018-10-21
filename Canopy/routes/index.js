var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var http = require('https');
var fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function decode(data) { }

function callExec(req, res){
  console.log("About to log image..");
  var dataText = req.body.image;
  console.log("callExec() start");
  dataText = dataText.split(",")[1];
  console.log(__dirname);
  fs.writeFileSync(__dirname+'/image.bananas', dataText, { flag: 'w'});
  var code = 'bash cd '+ __dirname+' && ' + __dirname+ '/output.exe -p '+ __dirname+'/image.bananas -d ' + __dirname;
  exec(code, function(err, data) {
      obj = JSON.parse(data);
      var score = obj.payload[0].classification.score;
      var classification = obj.payload[0].displayName;
      var output = classification + ' with ' + (score*100) + '% certainty.';
      res.json(output);
  });
}

function callExecArray(fileStr, res){
  console.log("About to log image..");
  var dataText = fileStr;
  console.log("callExec() start");
  dataText = dataText.split(",")[1];
  console.log(__dirname);
  fs.writeFileSync(__dirname+'/image.bananas', dataText, { flag: 'w'});
  var code = 'bash cd '+ __dirname+' && ' + __dirname+ '/output.exe -p '+ __dirname+'/image.bananas -d ' + __dirname;
  exec(code, function(err, data) {
      obj = JSON.parse(data);
      var classification = obj.payload[0].displayName;
      var output = classification;
      res.json(output);
  });
}

router.post('/upload', function (req, res, next) {
  callExec(req, res);
});

router.post('/uploadCoords', function (req, res, next) {
  var imageArrData = res.body;
  var file = fs.createWriteStream("file.jpg");
  var request = https.get(imageArrData[0], function(response) {
    response.pipe(file);
    console.log(file);
  });
  
  //callExecArray(file, res);
});

module.exports = router;
