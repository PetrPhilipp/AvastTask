let fs = require('fs');

exports.readNBytes = function (n) {
    if (!n) {
        return;
    }
    fs.open('./resources/lorem.txt', 'r', function (status, fd) {
        if (status) {
            console.log(status.message);
            return;
        }
        let buffer = Buffer.alloc(parseInt(n, 10));
        fs.read(fd, buffer, 0, n, 0, function (err, num) {
            return buffer.toString('utf-8', 0, num);
        });
    });
}