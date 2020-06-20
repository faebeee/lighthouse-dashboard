export const GET_REPORT_URL = (id) => `/api/reports/${ id }`;
export const GET_LATEST_REPORT_URL = (id) => `/api/reports/${ id }/latest`;
export const SPEED_OVERVIEW_URL = `/api/reports/overview`;
export const GET_SITES_URL = `/api/sites`;
export const GET_SITE_BY_ID_URL = (id) => `/api/sites/${ id }`;
export const GET_SITE_WITH_REPORT_URL = `/api/sites/latest-reports`;
export const POST_SITE_ALL_URL = `/api/sites/all`;
export const CREATE_REPORT_URL = (id) => `/api/sites/${ id }`;
export const GET_FAV_SITES_URL = `/api/sites/fav`;
export const GET_LATEST_AUDITED_SITES_URL = `/api/sites/latest`;
export const CREATE_SITE_URL = `/api/sites`;
export const AUTH_URL = `/api/auth`;
export const REMOVE_SITE_URL = (id) => `/api/sites/${ id }`;
export const GET_SYSTEM_INFO_URL = `/api/system`;
export const GET_HEALTH_API = `/api/health`;
