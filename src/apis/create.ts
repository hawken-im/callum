/* eslint-disable import/no-anonymous-default-export */
import request from '../utils/request'
import { API_BASE_URL,VAULT_API_BASE_URL,VAULT_APP_ID } from './env';
import { IObject, IPerson, ITrx, utils } from 'quorum-light-node-sdk';
import store from 'store2';
import { Store } from '../store';

interface IVaultOptions {
  ethPubKey: string
  jwt: string 
}



export default {
  createObject(object: IObject) {
  return createTrx(object, '_Object');
  },

  createPerson(person: IPerson) {
return createTrx(person, 'Person');
  },

  async get(trxId: string) {
    const group = utils.restoreSeedFromUrl(store('seedUrl'));
    const res: ITrx = await request(`${API_BASE_URL}/${group.group_id}/trx/${trxId}`);
    return res;
  }
}

async function createTrx(data: IObject | IPerson, type: '_Object' | 'Person') {
  const {  userStore } = (window as any).store as Store;
  const group = utils.restoreSeedFromUrl(store('seedUrl'));
  console.log(`any privateKey? ${userStore.privateKey}`)
  const payload = await utils.signTrx({
    type,
    data,
    groupId: group.group_id,
    aesKey: group.cipher_key,
    //version: configStore.config.version,
    privateKey: userStore.privateKey,//这里用 Store，等下看看要使没有就删掉，没法用contex的话，干脆作为参数把jwt和eth pub key发来就好了
    ...(userStore.jwt ? getVaultTrxCreateParam({
      ethPubKey: userStore.vaultAppUser.eth_pub_key, jwt: userStore.jwt
    }) : {})
  });
  console.log(payload);
  const res: { trx_id: string } = await request(`${API_BASE_URL}/trx`, {
    method: 'POST',
    body: payload
  });
  return res;
};

const getVaultTrxCreateParam = (vaultOptions: IVaultOptions) => {
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