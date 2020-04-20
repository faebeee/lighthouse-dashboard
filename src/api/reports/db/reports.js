import { ObjectId } from 'mongodb';
import config from '../../../../config/server';
import { AUDIT_COLLECTION } from '../../../config/db';
import logger from '../../../logger';

/**
 * Get a report by id
 * @param {MongoDB} database
 * @param {string} id
 * @return {Promise<Report>}
 */
export function getReportById(database, id) {
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .findOne({ _id: ObjectId(id) }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
    });
}

/**
 * Get all reports for a site
 * @param {MongoDB} database
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Report[]>}
 */
export function getReportsBySiteId(database, id, limit) {
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            //.sort({ _id: -1 })
            .limit(limit)
            .sort({ createdAt: -1 })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
    });
}

/**
 * Get latest report for site
 * @param {MongoDB} database
 * @param {string} id
 * @return {Promise<Report>}
 */
export async function getLatestReportBySiteId(database, id) {
    const collection = database.collection(AUDIT_COLLECTION);

    return collection.findOne({ siteId: id })
}

/**
 * Save a new report in DB
 * @param {MongoDB} database
 * @param {Report} report
 * @param {object} raw - raw lighthouse audit report
 */
export function saveReport(database, report, raw) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const saveRaw = process.env.LHD_IGNORE_RAW ? null : JSON.stringify(raw);
    if (process.env.LHD_IGNORE_RAW) {
        logger.debug('Ignore raw data');
    }
    reportCollection.insertOne({ ...report, raw: saveRaw });
}

/**
 * Free up space in DB by remove old data
 * @param {MongoDB} database
 * @return {Promise<void>}
 */
export async function clearReports(database) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const date = new Date(config.DB.MAX_RAW_DATA_HISTORY).toISOString();
    const filter = {
        raw: { $ne: false },
        createdAt: {
            $lt: date,
        },
    };
    const rows = await reportCollection.countDocuments(filter);

    logger.debug(`Found ${ rows } rows to clear`);
    const { modifiedCount } = await reportCollection.updateMany(filter, { $set: { raw: false } });
    logger.debug(`Cleared ${ modifiedCount } rows raw data`);
}


/**
 * Free up space in DB by remove old data
 * @param {MongoDB} database
 * @return {Promise<void>}
 */
export async function removeOldReports(database) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const date = new Date(config.DB.MAX_REPORTS_HISTORY).toISOString();
    const filter = {
        createdAt: {
            $lt: date,
        },
    };
    const rows = await reportCollection.countDocuments(filter);

    logger.debug(`Found ${ rows } reports to remove`);
    const { deletedCount } = await reportCollection.deleteMany(filter);
    logger.debug(`Removed ${ deletedCount } reports`);
}