let express = require('express');
let router = express.Router();
let NBytes = require('../numberOfBytes')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Avast Task' });
});

router.get('/unixTime', function(req, res, next) {
  let uTime = Date.now;
  res.render('unixTime', { title: 'Unix Time', time: uTime()});
});

router.get('/nBytes/:num?', function(req, res, next) {
  let numOfBytes = req.params.num;
  let nBytesAsString;
  if(numOfBytes > 0 & numOfBytes < 2147483647){
    nBytesAsString = NBytes.readNBytes(numOfBytes);
  }
  res.render('nBytes', { title: 'N Bytes', num: numOfBytes, bytesAsString: nBytesAsString});
});

router.post('/nBytes/submit', function (req, res, next) {
  let num = req.body.numberOfBytes;
  res.redirect(num);
})

router.get('/contentOfURL/:cont?', function(req, res, next) {
  res.render('contentOfURL', { title: 'contentOfURL', output: req.params.cont});
});

module.exports = router;
