/* eslint-disable import/no-anonymous-default-export */
import request from '../utils/request';
import { URL } from './env';
import { IUser } from './types';
import qs from 'query-string';

export default {
  async get(userAddress: string, options: {
    viewer: string
  }) {
    const item: IUser = await request(`${URL}/users/${userAddress}?${qs.stringify(options)}`);
    return item;
  }
}