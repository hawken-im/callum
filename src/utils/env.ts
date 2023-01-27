export const isProduction = process.env.REACT_APP_ENV === 'production';

export const URL_ORIGIN = isProduction ?  window.location.origin : 'http://localhost:9000';

export const URL = `${URL_ORIGIN}/api`;
