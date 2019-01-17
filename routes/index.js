let express = require('express');
let router = express.Router();
let NBytes = require('../models/numberOfBytes')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Avast Task' });
});

router.get('/unixTime', function(req, res, next) {
  let uTime = Date.now;
  res.render('unixTime', { title: 'Unix Time', time: uTime()});
});

router.get('/nBytes', function (req, res, next) {
  res.render('nBytes', {title: 'N Bytes', num: '0', bytesAsString: '0'});
});

router.post('/nBytes/submit', function (req, res, next) {
  let numOfBytes = req.body.numberOfBytes;

  NBytes.readXBytes(numOfBytes).then((utf8Bytes) => {
    console.log('n',utf8Bytes);
    res.render('nBytes', {title: 'N Bytes', num: numOfBytes, nb: utf8Bytes});
  }).catch((err => {
    console.error(err.message);
    res.render('nBytes', {title: 'N Bytes', num: numOfBytes, bytesAsString: '0'});
  }))
})

router.get('/contentOfURL/:cont?', function(req, res, next) {
  res.render('contentOfURL', { title: 'contentOfURL', output: req.params.cont});
});

module.exports = router;
