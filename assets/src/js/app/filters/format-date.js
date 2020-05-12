import { format } from 'date-fns';
import { dateFormat } from '../../../../../config/dashboard';

/**
 * Format date
 * @param {string|null} value
 * @return {string|null}
 */
export default function formatDate(value) {
    if (!value) {
        return null;
    }

    return format(new Date(value), dateFormat);
};