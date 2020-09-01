import joi from '@hapi/joi';
import { findSites, getAllSites } from '../../../../lib/core/services/site-service';
import { MEDIUM } from '../../../config/cache';
import { reportModelSchema } from '../../reports/schemas/report-model-schema';

/**
 * Get sites
 * @param {object} query
 * @return {Promise<Sites.SiteModel[]>}
 */
function getSitesHandler({ query }) {
    const { query: searchQuery } = query;

    if (searchQuery) {
        try {
            return findSites({ $text: { $search: searchQuery } }, { name: -1 });
        } catch (e) {
            console.log(e);
        }
    }

    return getAllSites();
}

export default {
    method: 'GET',
    path: '/api/sites',
    handler: getSitesHandler,
    options: {
        description: 'Get all configured sites',
        tags: ['api', 'sites'],
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
        response: {
            schema: joi
                .array()
                .items(reportModelSchema)
                .label('GetReportsResponse'),
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
