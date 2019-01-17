let fs = require('fs');

// TODO: rewrite as async
// testing: for this jest, enzime
exports.readXBytes = function(n){
    return new Promise((resolve, reject) =>{
        if (!n) {
            reject('N');
            return;
        }
        fs.open('./resources/lorem.txt', 'r', function (err, fd) {
            if (err) {
                reject(new Error(err.message))
            }
            let buffer = Buffer.alloc(parseInt(n, 10));
            fs.read(fd, buffer, 0, n, 0, function (err, num) {
                resolve(buffer.toString('utf-8', 0, num));
            });
        });
    })
}