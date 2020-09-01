import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/login',
    options: {
        description: 'Main entry point',
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
    },
    handler: (request, h) => {
        return h.view('views/login.twig', getDefaultParams(request));
    },
};
