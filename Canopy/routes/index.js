var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function decode(data) {

}

function callExec(req, res){
  console.log("About to log image..");
  console.log(req.body.image);
  var dataText = req.body.image;
  console.log("callExec() start");

  dataText = dataText.split(",")[1];
  console.log(__dirname);
  fs.writeFileSync(__dirname+'/image.bananas', dataText, { flag: 'w'});
  exec('bash ' + __dirname+ '/output.exe -p '+ __dirname+'/image.bananas', function(err, data) {
       console.log('data: /n' + data);
       console.log('error: /n' + err);
       res.json(data);
   });
}

router.post('/upload', function (req, res, next) {

  callExec(req, res);
});

module.exports = router;
