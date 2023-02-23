import React, { useState, useEffect, useContext } from 'react';
// import { useStore, StoreContext } from '../store';
import { useCurrentUserContext } from '../store';
import { createUserStore } from '../store/user'; 
import { ProfileApi, VaultApi, getConfig,TrxApi } from '../apis';
import * as Vault from '../utils/vault';
import Base64 from '../utils/base64';
import { isEmpty } from 'lodash';
import { IVaultAppUser } from '../apis/types';
import isJWT from '../utils/isJWT';
import { ethers } from 'ethers';
import * as JsBase64 from 'js-base64';
import store from 'store2';
import { useSearchParams } from 'react-router-dom';


const Preload = () => {

  const {setUserMe} = useCurrentUserContext();
  const userStore = createUserStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const config = await getConfig();
      store('seedUrl', config);
      console.log(`seedUrl stored: ${JSON.stringify(store('seedUrl'))}`)
    })();
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    const accessToken = searchParams.get('access_token');
    console.log(`access_token got: ${accessToken}`);
    const handleToken = async (token: string, accessToken: string) => {
      const jwt = isJWT(token) ? token : await Vault.decryptByCryptoKey(token);
      const _accessToken = accessToken ? (isJWT(accessToken) ? accessToken : await Vault.decryptByCryptoKey(accessToken)) : '';
      Vault.removeCryptoKeyFromLocalStorage();
      userStore.setJwt(jwt);

      const vaultUser = await VaultApi.getUser(jwt);
      console.log(`vaultUser got:`)
      console.log({ vaultUser });
      let vaultAppUser = {} as IVaultAppUser;
      try {
        vaultAppUser = await VaultApi.getAppUser(jwt, vaultUser.id);
      } catch (err) {
        console.log(err);
        vaultAppUser = await VaultApi.createAppUser(jwt);
      }
      console.log(`vaultAppUser got:`)
      console.log({ vaultAppUser });
      const compressedPublicKey = ethers.utils.arrayify(ethers.utils.computePublicKey(vaultAppUser.eth_pub_key, true));
      const publicKey = JsBase64.fromUint8Array(compressedPublicKey, true);
      userStore.setVaultAppUser({
        ...vaultAppUser,
        eth_pub_key: publicKey,
        access_token: _accessToken || jwt,
        provider: isJWT(token) ? 'web3' : (vaultUser.mixin ? 'mixin' : 'github')
      });
      console.log(`userStore.setVaultAppUser: ${JSON.stringify(userStore.vaultAppUser)}`)
      try {
        const profileExist = await ProfileApi.exist(userStore.address);
        if (!profileExist && !isJWT(token)) {
          const avatar: any = await Base64.getFromBlobUrl(vaultUser.avatar_url || 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png');
          const res = await TrxApi.createPerson({
            name: vaultUser.display_name,
            image: {
              mediaType: Base64.getMimeType(avatar.url),
              content: Base64.getContent(avatar.url),
            },
          });
          console.log(res);
          userStore.setProfile({
            name: vaultUser.display_name,
            avatar: avatar.url,
            userAddress: vaultAppUser.eth_address
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    ///////////
    (async () => {
      try {
        if (token) {
          await handleToken(token, accessToken||'');
          console.log('token handled');
        }
        if (userStore.isLogin) {
          const [profile] = await Promise.all([
            ProfileApi.get(userStore.address)
          ]);
          console.log(`1`)
          if (isEmpty(userStore.profile)) {
            userStore.setProfile(profile);
            console.log(`2`)
          }
          setUserMe(userStore);
          console.log(`user profile set`);
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);



  useEffect(() => {
    if(userStore.isLogin){

      searchParams.delete('access_token');
      searchParams.delete('token');
      setSearchParams(searchParams);

      console.log(`clean up searchParams`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  return null;
};

export default Preload;