'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
 
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            // Read the HTML file synchronously
            const htmlFilePath = path.join(__dirname, 'index.html');
            const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

            return h.response(htmlContent).type('text/html');
        }
    });

    server.route({
        method: 'GET',
        path: '/march.wasm', // Define the route for the wasm file
        handler: (request, h) => {
            // Read the WebAssembly file asynchronously
            const wasmFilePath = path.join(__dirname, 'march.wasm');
            const wasmContent = fs.readFileSync(wasmFilePath);

            return h.response(wasmContent).type('application/wasm');
        }
    });


    server.route({
        method: 'GET',
        path: '/march.js', // Define the route for the JavaScript glue code file
        handler: (request, h) => {
            // Read the JavaScript glue code file asynchronously
            const jsFilePath = path.join(__dirname, 'march.js');
            const jsContent = fs.readFileSync(jsFilePath, 'utf8');

            return h.response(jsContent).type('application/javascript');
        }
    });




    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
