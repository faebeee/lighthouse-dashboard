import { getScheduledSites } from '../../../../lib/core/services/site-service';
import { siteConfigModelList } from '../schemas/site-config-model';

/**
 * Get sites
 * @return {Promise<Sites.SiteModel[]>}
 */
function getScheduledSitesHandler() {
    return getScheduledSites();
}

export default {
    method: 'GET',
    path: '/api/sites/scheduled',
    handler: getScheduledSitesHandler,
    options: {
        description: 'Get all scheduled sites',
        tags: ['api', 'sites'],
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
        response: {
            schema: siteConfigModelList,
        },
    },
};
