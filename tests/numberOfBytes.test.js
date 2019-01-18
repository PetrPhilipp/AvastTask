const request = require('supertest');
const app = require('../app');
const nOfB = require('../models/numberOfBytes');
const regLines = /[\r\n]/g;


// This only tests scenarios that can happen as of now !
describe('Testing the readNBytes', () => {

    test('asking for 1 Byte, should return L', () => {
        return nOfB.readNBytes(1).then(n => {
            expect(n).toEqual('L');
        });
    });

    test('asking for 5 Bytes, should return Lorem', () => {
        return nOfB.readNBytes(5).then(n => {
            expect(n).toEqual('Lorem');
        });
    });

    test('asking for 100 Bytes, should return 100 Bytes', () => {
        return nOfB.readNBytes(100).then(n => {
            expect(n).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu aliquet tellus. Etiam felis');
        });
    });

    test('asking for more bytes than the file contains, should return the whole file', () => {

        const shouldBe =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu aliquet tellus. Etiam felis mi, pharetra quis tellus dictum, lobortis fermentum purus. Quisque venenatis lectus diam, ac mollis justo rhoncus sagittis. Praesent at congue neque, quis aliquet urna. Sed magna metus, varius ac condimentum id, finibus quis ante. Donec et erat malesuada, convallis ante semper, tristique lorem. Aenean non nisl malesuada, suscipit leo quis, accumsan nibh.\n' +
            '\n' +
            'Donec volutpat eros in neque congue iaculis. Quisque sed libero eu elit vestibulum varius. Pellentesque a ex bibendum, posuere nisl in, sodales quam. Aenean vel scelerisque mi. Sed nec lacus pellentesque dolor sollicitudin egestas. Sed auctor odio laoreet ex aliquet, tincidunt placerat arcu varius. Donec vel rutrum tellus. In ultricies magna sed eleifend venenatis. Donec id orci a nulla cursus venenatis. Aliquam finibus tortor diam, quis suscipit neque consequat et. Maecenas luctus mattis justo, a consectetur urna imperdiet ac.\n' +
            '\n' +
            'Duis et enim eget risus feugiat hendrerit non vel dui. Vestibulum a lorem non urna auctor faucibus vitae in tortor. Aenean maximus consequat efficitur. Etiam nibh libero, fermentum et dictum eget, aliquam sed ex. Phasellus scelerisque libero vel nisl aliquet porttitor. Suspendisse fringilla elit feugiat ante semper, nec aliquet ipsum tincidunt. In aliquet turpis id accumsan luctus. Vestibulum suscipit, justo eu ultrices accumsan, velit massa vehicula sem, vitae vehicula eros mi ac justo. Integer ipsum nisi, tempor non nisi sed, luctus rutrum magna. Suspendisse fringilla nibh odio, mattis pellentesque libero fermentum quis. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent sed neque in sapien pellentesque sollicitudin a non augue. Mauris nec ante non dolor pulvinar aliquam sed nec odio. Aenean hendrerit libero libero, quis laoreet lorem tempus sit amet.\n' +
            '\n' +
            'Curabitur consequat magna dui, tristique feugiat quam laoreet vel. Phasellus in cursus erat. Fusce feugiat lectus nulla. Morbi tempor massa ut rutrum vulputate. Quisque imperdiet ligula lacus, nec bibendum lacus sollicitudin non. Vivamus tincidunt, ligula eget ultricies viverra, mi nibh mattis purus, quis viverra felis orci sed sapien. Sed rhoncus vel ipsum in consectetur. Donec porttitor dui ante, eget mattis ex faucibus eget. Etiam molestie, orci ut mollis fringilla, magna diam rutrum nisi, non fermentum nisi enim vel mi. Vestibulum pretium rutrum malesuada. Ut vel tortor vitae diam finibus faucibus vitae quis nibh. Proin a purus mi. Donec rutrum risus velit, ac venenatis ipsum porta eu. Sed erat velit, pharetra sit amet pretium eget, tincidunt at erat.';

        return nOfB.readNBytes(999999).then(n => {
            expect(n.replace(regLines, "")).toEqual(shouldBe.replace(regLines, ""));
        });
    });
});

describe('ROUTING GET', () => {

    test('GET "/" expect 200', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Avast task');
        })
    })

    test('GET "/unixTime" expect 200', () => {
        return request(app).get('/unixTime').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get current time');
        })
    })

    test('GET "/nBytes" expect 200', () => {
        return request(app).get('/nBytes').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get first N bytes of a file');
        })
    })

    test('GET "/contentOfURL" expect 200', () => {
        return request(app).get('/contentOfURL').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get content of URL');
        })
    })

    test('GET "/contentOfURL/thisShouldBeThere" expect 200', () => {
        return request(app).get('/contentOfURL/thisShouldBeThere').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('thisShouldBeThere');
        })
    })

    test('GET "/badOne" expect 404', () => {
        return request(app).get('/BadOne').then(response => {
            expect(response.statusCode).toBe(404);
        })
    })
})
