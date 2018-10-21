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
  var dataText = req.body.image;
  console.log("callExec() start");
  dataText = dataText.split(",")[1];
  console.log(__dirname);
  fs.writeFileSync(__dirname+'/image.bananas', dataText, { flag: 'w'});
  var code = 'bash cd '+ __dirname+' && ' + __dirname+ '/output.exe -p '+ __dirname+'/image.bananas -d ' + __dirname;
  exec(code, function(err, data) {
       console.log(code);
       console.log('data: /n' + data);
       console.log('error: /n' + err);
       res.json(data);
   });
}

router.post('/upload', function (req, res, next) {

  callExec(req, res);
});

module.exports = router;
