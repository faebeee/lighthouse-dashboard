import Boom from '@hapi/boom';
import CONFIG from '../../../../server.config';
import { getReportsBySiteId } from '../../../database/reports';
import { getSiteConfigById } from '../../../database/sites';
import reportsToLineChart from '../../../transformer/reports-to-line-chart';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<ChartData>}
 */
export default async function getRecentReports({ params }) {
    const { id } = params;

    const config = getSiteConfigById(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(id, CONFIG.API.SITE_REPORT_LIMIT);
    if (!assets || assets.length === 0) {
        return Boom.notFound('No audits found');
    }

    return reportsToLineChart(assets);
}
