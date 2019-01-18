const fs = require('fs');

const loremPath = './resources/lorem.txt';
exports.readNBytes = (n) => {
    return new Promise((resolve, reject) =>{
        fs.open(loremPath, 'r', (err, fd) => {
            if (err) {
                reject(err.message);
            }
            let buffer = Buffer.alloc(parseInt(n, 10));
            fs.read(fd, buffer, 0, n, 0, (err, num) => {
                resolve(buffer.toString('utf-8', 0, num));
            });
        });
    })
}