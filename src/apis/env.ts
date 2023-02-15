export const isProduction = process.env.REACT_APP_ENV === 'production';

export const URL_ORIGIN = isProduction ?  window.location.origin : 'http://localhost:9000';

export const URL = `${URL_ORIGIN}/api`;

export const VAULT_API_BASE_URL = 'https://vault.rumsystem.net/v1';

export const VAULT_APP_ID = 51743760113733;
