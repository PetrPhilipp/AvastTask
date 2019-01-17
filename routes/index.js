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
  res.render('nBytes', {
    title: 'N Bytes',
    num: numOfBytes,
    bytesAsString: NBytes.readXBytes(numOfBytes).then((n)=>{
      res.send('nBytes').body({ title: 'N Bytes', num: numOfBytes, bytesAsString: n});
    }).catch((error => {
      console.log(error);
    }))
  });
});
// let nBytesAsString;
// if(numOfBytes > 0 & numOfBytes < 2147483647){
//   NBytes.readXBytes(numOfBytes).then((n)=>{
//     nBytesAsString = n;
//     res.render('nBytes', { title: 'N Bytes', num: numOfBytes, bytesAsString: nBytesAsString});
//   }).catch((error => {
//     console.log(error);
//   }));
// }

router.post('/nBytes/submit', function (req, res, next) {
  let num = req.body.numberOfBytes;
  res.redirect(num);
})

router.get('/contentOfURL/:cont?', function(req, res, next) {
  res.render('contentOfURL', { title: 'contentOfURL', output: req.params.cont});
});

module.exports = router;
