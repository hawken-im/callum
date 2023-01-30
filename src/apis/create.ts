import axios from 'axios';
import { URL } from './env';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IActivity, ITrx, utils } from 'rum-sdk-browser';
import store from 'store2';

const createActivity = async (activity: IActivity)=>{
  const group = utils.restoreSeedFromUrl(store('seedUrl'));
  const payload = await utils.signTrx({
      data: activity,
      groupId: group.group_id,
      aesKey: group.cipher_key,
      privateKey: store('privateKey'),
  });
  console.log(`create activity payload: ${payload}`);

  return axios.post(`${URL}/trx`, payload).then((res)=>{
    console.log(`the raw data returned: ${JSON.stringify(res)}`)
    console.log(`content posted on chain, trx_id: ${res.data.trx_id}`)
    return `${res.data.trx_id}`;
  });
};

// const get = async (trxId: string) => {
//   const res: ITrx = await axios(`${URL}/trx/${trxId}`);
//   return res;
// }

export default createActivity;