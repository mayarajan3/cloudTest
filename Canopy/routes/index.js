var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Hello World");
  res.render('index', { adj: 'Delightful' });
});

router.post('/upload', function (req, res) {

  res.json({'color': 'red'});
});

module.exports = router;
