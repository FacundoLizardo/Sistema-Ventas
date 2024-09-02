export const LANDING_PAGE_URL = '/';
export const LOGIN_PAGE_URL = '/login';
export const CHECK_EMAIL_URL = '/email';
export const DASHBOARD_PAGE_URL = '/dashboard';
export const DASHBOARD_STATS_PAGE_URL = DASHBOARD_PAGE_URL.concat('/stats');

export const SALES_PAGE_URL = '/sales'
export const STOCK_PAGE_URL = '/stock'


export const companyPageUrl = (companyId: string | undefined) => {
    if (companyId) return LANDING_PAGE_URL.concat(`${companyId}`);
    return NOT_FOUND_PAGE_URL;
  };



export const EVENT_PAGE_URL = '/event';

//ejemplo de como manejar una ruta dinamica
export const eventPageUrl = (eventId: string | undefined) => {
  if (eventId) return EVENT_PAGE_URL.concat(`/${eventId}`);
  return NOT_FOUND_PAGE_URL;
};

export const NOT_FOUND_PAGE_URL = '/404';

export const PUBLIC_ROUTES = [LANDING_PAGE_URL];

export const LOGOUT_PAGE_URL = '/logout';
