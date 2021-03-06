/* eslint-disable global-require */
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import hapiError from 'hapi-error';
import HapiSwagger from 'hapi-swagger';

import { name, version } from '../../package.json';
import { isDev } from '../utils/is-dev';

export default () => ({
    dev: [
        { plugin: blipp, options: { showAuth: true } },
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: name,
                    version: version,
                },
                grouping: 'tags',
                tags: [
                    { name: 'sites', description: 'Sites API' },
                    { name: 'auth', description: 'Auth API' },
                    { name: 'health', description: 'Health API' },
                    { name: 'reports', description: 'Reports API' },
                ],
            },
        },
        {
            plugin: require('hapi-dev-errors'),
            options: {
                showErrors: true,
            },
        },
    ],
    prod: [
        Inert,
        Vision,
        !isDev && (
            {
                plugin: hapiError,
                options: {
                    templateName: 'views/error',
                    statusCodes: {
                        401: { // if the statusCode is 401
                            redirect: '/login', // redirect to /login page/endpoint
                        },
                        403: { // if the statusCode is 403
                            redirect: (request) => `/login?redirect=${ request.url.pathname }`,
                        },
                    },
                },
            }
        ),
    ],
});
