'use strict';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Hapi from '@hapi/hapi';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
        path: '/function.wasm', // Define the route for the wasm file
        handler: (request, h) => {
            // Read the WebAssembly file asynchronously
            const wasmFilePath = path.join(__dirname, 'function.wasm');
            const wasmContent = fs.readFileSync(wasmFilePath);

            return h.response(wasmContent).type('application/wasm');
        }
    });

    server.route({
        method: 'GET',
        path: '/function.js', // Define the route for the JavaScript glue code file
        handler: (request, h) => {
            // Read the JavaScript glue code file asynchronously
            const jsFilePath = path.join(__dirname, 'function.js');
            const jsContent = fs.readFileSync(jsFilePath, 'utf8');

            return h.response(jsContent).type('application/javascript');
        }
    });

    server.route({
        method: 'GET',
        path: '/req.js', // Define the route for the JavaScript glue code file
        handler: (request, h) => {
            // Read the JavaScript glue code file asynchronously
            const jsFilePath = path.join(__dirname, 'req.js');
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
