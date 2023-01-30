import axios from 'axios';
import { URL } from './env';
import { IConfig } from './types';



// async function getSeedUrl() {
//   const res = await axios.get(`${URL}/config`);
//   console.log(`get seed url: ${res.data}`);
//   const seedUrl:IConfig = res.data;
//   console.log(`seedUrl in IConfig: ${seedUrl}`)
//   return seedUrl;
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async get() {
    const item: IConfig = (await axios(`${URL}/config`)).data;
    return item;
  },
}



// function getSeedUrl() {
//   return axios.get(`${URL}/config`).then(res => {
//     console.log(`get seed url: ${res.data}`);
//     const seedUrl:IConfig = res.data;
//     return seedUrl;
//   });
// }


