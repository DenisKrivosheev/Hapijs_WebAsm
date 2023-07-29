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

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
