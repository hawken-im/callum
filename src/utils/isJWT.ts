/* eslint-disable import/no-anonymous-default-export */
export default (token: string) => (token || '').split('.').length === 3;