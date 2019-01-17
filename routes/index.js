const express = require('express');
const router = express.Router();
const NBytes = require('../models/numberOfBytes')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Avast Task' });
});

router.get('/unixTime', function(req, res, next) {
  const uTime = Date.now;
  res.render('unixTime', { title: 'Unix Time', time: uTime()});
});

router.get('/nBytes', function (req, res, next) {
  res.render('nBytes', {title: 'N Bytes', num: '0', bytesAsString: '0'});
});

router.post('/nBytes/submit', function (req, res, next) {
  const numOfBytes = req.body.numberOfBytes;
  NBytes.readNBytes(numOfBytes).then((utf8Bytes) => {
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
