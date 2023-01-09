const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req , res) => {
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    }); // function will run once no matter how mant time you call it
    greet();
    greet();

    //Request
    // console.log('Request made');
    // console.log(req);
    // console.log(req.url, req.method);

    //Response
    // set header content type
    res.setHeader('Content-Type', 'text/html');
    
    //ROUTING
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

        //redirecting
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    };

    // res.write('<h1>Hello, Bankah</h1>');
    // res.write('<p>Welcome back ☺</p>');

    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // for multiple use the res.write but for single put it in the res.end
            //res.write(data);
            res.end(data);
        }
    });

});

server.listen(3000 , 'localhost' , () => {
    console.log('Listening for request on port 3000');
});