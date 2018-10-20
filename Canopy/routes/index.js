var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function callExec(req, res){
  console.log("callExec() start");
  exec('HelloJithin.exe', function(err, data) {  
       console.log('data: /n' + data);
       console.log('error: /n' + err);
       res.json(data);                      
   });  
}

router.post('/upload', function (req, res) {
  callExec(req, res);
});





module.exports = router;
