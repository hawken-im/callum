import axios from 'axios';
import { API_BASE_URL } from './env';
//import { IConfig } from './types';


// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  return axios.get(`${API_BASE_URL}/config`).then(res => {
    console.log(`get seed url: ${res.data}`);
    return `${res.data}`;
  })
}