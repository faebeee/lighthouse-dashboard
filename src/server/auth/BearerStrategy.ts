import {Request} from "hapi";


export default function create(secret: string) {
    return {
        allowQueryToken: true,
        validate: async (request: Request, token: string) => {
            const isValid = token === secret;

            const credentials = {token};
            const artifacts = {};

            return {isValid, credentials, artifacts};
        }
    };
}