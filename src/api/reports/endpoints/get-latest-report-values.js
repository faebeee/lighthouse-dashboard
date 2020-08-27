import Boom from '@hapi/boom';
import { MEDIUM } from '../../../config/cache';
import { getLatestReportBySiteId } from '../../../../lib/core/services/report-service';
import { siteIdParamModel } from '../schemas/siteid-param-model';

/**
 * Handler to get latest latest created report values
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<Reports.Report | null>}
 */
async function getLatestReportValues({ params }) {
    const { siteId } = params;

    const report = await getLatestReportBySiteId(siteId);
    if (!report) {
        return Boom.notFound();
    }
    return report;
}

export default {
    method: 'GET',
    path: '/api/reports/{siteId}/latest',
    handler: getLatestReportValues,
    options: {
        description: 'Get latest report for site',
        tags: ['api', 'reports'],
        auth: 'jwt',
        validate: {
            params: siteIdParamModel,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
