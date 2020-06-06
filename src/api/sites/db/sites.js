import uuid from 'uuid/v4';
import { latestAuditChart } from '../../../../config/dashboard';
import { SITES_CONFIG_COLLECTION } from '../../../config/db';

/**
 * Find sites
 * @param {Db} database
 * @param { object } find
 * @param { object } sort
 * @param { number } limit
 * @return {Promise<Sites.SiteConfig[]>}
 */
export function findSites(database, find, sort = {}, limit = 100) {
    const collection = database.collection(SITES_CONFIG_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find(find)
            .sort(sort)
            .limit(limit)
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve([]);
                }

                delete data._id;

                return resolve(data);
            });
    });
}

/**
 * Get list of sites from DB
 * @param {Db} database
 * @return {Promise<Sites.SiteConfig[]>}
 */
export function getAllSites(database) {
    return findSites(database, {}, { last_audit: -1 });
}

/**
 * Get list of sites from DB
 * @param {Db} database
 * @return {Promise<Sites.SiteConfig[]>}
 */
export function getFavoriteSites(database) {
    return findSites(database, { is_favorite: true }, { order: 1 });
}

/**
 * Get latest n audited sites
 * @param {Db} database
 * @return {Promise<Sites.SiteConfig[]>}
 */
export function getLatestSites(database) {
    return findSites(database, {
        last_audit: {
            $exists: true,
            $ne: null,
        },
    }, { last_audit: -1 }, latestAuditChart.limit);
}

/**
 * Add new site to DB
 * @param {Db} database
 * @param {Pick<Sites.SiteConfig, "name"|"device"|"url"|"is_favorite">} config
 * @return {Promise<Sites.SiteConfig>}
 */
export async function addSite(database, config) {
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    const id = uuid();
    await siteCollection.insertOne({ id, ...config });
    return getSiteConfigById(database, id);
}

/**
 * Update site config
 * @param {Db} database
 * @param {string} id
 * @param {Partial<Sites.SiteConfig>} delta
 * @return {Promise<Sites.SiteConfig>}
 */
export function updateSite(database, id, delta) {
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    siteCollection.updateOne({ id }, { $set: delta });
    return getSiteConfigById(database, { id });
}

/**
 * Remove site from DB
 * @param {Db} database
 * @param {string} id
 */
export function removeSite(database, id) {
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    siteCollection.deleteOne({ id });
}

/**
 * Get config for specific site
 * @param {Db} database
 * @param {string} id
 * @return {Promise<Sites.SiteConfig | null>}
 */
export async function getSiteConfigById(database, id) {
    const sites = await findSites(database, { id }, {}, 1);
    if (!sites || sites.length === 0) {
        return null;
    }

    return sites.pop();
}

/**
 * Get config for specific site
 * @param {Db} database
 * @param {string} token
 * @return {Promise<Sites.SiteConfig | null>}
 */
export async function getSiteConfigByToken(database, token) {
    const sites = await findSites(database, { token }, {}, 1);
    if (!sites || sites.length === 0) {
        return null;
    }

    return sites.pop();
}

/**
 * Update the amount of scheduled jobs
 * @param {Db} database
 * @param {Sites.SiteConfig} config
 * @param {number} increase
 */
export async function setScheduledAuditForSite(database, config, increase) {
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    await siteCollection.updateOne({ id: config.id }, { $set: { scheduled_jobs: config.scheduled_jobs ? config.scheduled_jobs + increase : increase } });
}
