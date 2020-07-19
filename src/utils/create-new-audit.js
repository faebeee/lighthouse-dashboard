import curry from 'lodash.curry';
import logger from '../../lib/logger';
import { saveReport } from '../services/report-service';
import { updateSite } from '../services/site-service';
import lighthouseTransformer from './lighthouse-transformer';
import runLighthouse from './run-lighthouse';

/**
 * Create new audit
 * @param {Sites.SiteModel} config
 * @param {ReportMeta | {}} meta
 * @return {Promise<Reports.Report>}
 */
export async function createNewAuditForConfig(config, meta = {}) {
    const { url, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        const { transformed, raw } = await runLighthouse({
            config: { url, runs: 2, device },
            transformer: transformAuditCurry(config.id),
            chromePath: process.env.GOOGLE_CHROME_BIN,
            port: process.env.GOOGLE_CHROME_PORT,
        });

        const thumbnail = (raw.audits && raw.audits['screenshot-thumbnails']) ? [...raw.audits['screenshot-thumbnails'].details.items].pop().data : config.thumbnail;

        await saveReport({ ...transformed, ...meta }, raw);
        await updateSite(config.id, { last_audit: new Date().toISOString(), thumbnail });
        return transformed;
    } catch (e) {
        logger.error(e.message);
    }
    return null;
}
