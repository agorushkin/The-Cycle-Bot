import { Config } from '/config.ts';

import { WebServer } from 'http-server';

const server = new WebServer();

import { handler as authRequestHandler } from '/server/routes/auth.ts';

server.use('/auth', 'GET', authRequestHandler);

server.static('/public', './public');

server.open(Config.http.port);
console.log(`Server running on port ${ Config.http.port }`);