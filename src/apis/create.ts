import axios from 'axios';
import request from '../utils/request'
import { URL,VAULT_API_BASE_URL,VAULT_APP_ID } from './env';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IActivity, ITrx, utils } from 'rum-sdk-browser';
import store from 'store2';
//import { Store } from '../store';

const createActivity = async (activity: IActivity, groupId?: string, publicKey?: any)=>{
  const group = utils.restoreSeedFromUrl(store('seedUrl'));
  // const { userStore } = (window as any).store as Store;
  const payload = await utils.signTrx({
      data: activity,
      groupId: group.group_id,
      aesKey: group.cipher_key,
      privateKey: store('privateKey'),
      ...((!!store('jwt') && !!publicKey) ? getVaultTrxCreateParam({
        ethPubKey: publicKey, jwt: store('jwt')
      }) : {})
  });

  return axios.post(`${URL}/trx`, payload).then((res)=>{
    console.log(`content posted on chain, trx_id: ${res.data.trx_id}`)
    return `${res.data.trx_id}`;
  });
};

// const get = async (trxId: string) => {
//   const res: ITrx = await axios(`${URL}/trx/${trxId}`);
//   return res;
// }

interface IVaultOptions {
  ethPubKey: string
  jwt: string 
}

const getVaultTrxCreateParam = (vaultOptions: IVaultOptions) => {
  console.log('why? metamask?')
  const { ethPubKey, jwt } = vaultOptions;

  return {
    publicKey: ethPubKey,
    sign: async (m: string) => {
      const res = await request(`/app/user/sign`, {
        base: VAULT_API_BASE_URL,
        method: 'POST',
        body: {
          appid: VAULT_APP_ID,
          hash: `0x${m}`
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        } 
      });
      return res.signature.replace(/^0x/, '');
    },
  };
}

export default createActivity;