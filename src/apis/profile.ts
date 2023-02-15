/* eslint-disable import/no-anonymous-default-export */
import request from '../utils/request';
import { URL } from './env';
import { IProfile } from './types';

export default {
  async get(userAddress: string) {
    const item: IProfile = await request(`${URL}/profiles/${userAddress}`);
    return item;
  },

  async exist(userAddress: string) {
    const item: boolean = await request(`${URL}/profiles/${userAddress}/exist`);
    return item;
  }
}