'use strict';

const Hapi = require('hapi');
const AuthBasic = require('hapi-auth-basic');
const AuthBearer = require('hapi-auth-bearer-token');
const path = require('path');
const laabr = require('laabr');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Tv = require('tv');
const options = { endpoint: '/awesome' };

const { name, version } = require('../package');
const bearerStrategy = require('./auth/bearerStrategy');
const routes = require('./routes');

require('dotenv').config();

const TOKEN = process.env.CIRCLE_TOKEN;
const PORT = process.env.PORT || 3000;
const LIMIT = process.env.LIMIT || 10;

const server = Hapi.server({
    port: PORT,
    host: '0.0.0.0',
    routes: {
        cors: true,
        files: {
            relativeTo: path.join(__dirname, '..')
        }
    }
});

const swaggerOptions = {
    info: {
        title: name,
        version: version,
    },
};


server.app.token = TOKEN;
server.app.limit = LIMIT;

const init = async () => {
    await server.register(Inert);
    await server.register(AuthBasic);
    await server.register(AuthBearer);
    await server.register({
        plugin: laabr
    });

    await server.register({register: Tv.register});

    if (process.env.NODE_ENV === 'development') {
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
    }

    server.auth.strategy('bearer', 'bearer-access-token', bearerStrategy);

    server.auth.default('bearer');

    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    console.log(`Server running at: ${server.info.uri}`);
    await server.start();

};

init();
