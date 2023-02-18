import React, { useState,useEffect } from 'react';
import { createActivity } from '../apis';
import { useStore } from '../store';
import { ProfileApi, VaultApi } from '../apis';

import * as Vault from '../utils/vault';
import { isEmpty } from 'lodash';

import { IVaultAppUser } from '../apis/types';

import isJWT from '../utils/isJWT';

import { ethers } from 'ethers';
import * as JsBase64 from 'js-base64';
import store from 'store2';

import { useLocation, useSearchParams } from 'react-router-dom';


const Preload = () => {
  const { userStore } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const accessToken = searchParams.get('access_token');
  //const search = useLocation().search;
  //const token = new URLSearchParams(search).get('token');
  //const accessToken = new URLSearchParams(search).get('access_token');

  useEffect(()=>{
    if (token){
      console.log(`access_token got: ${accessToken}`);
      searchParams.delete('token');
      searchParams.delete('access_token');
      setSearchParams(searchParams);
    }
  },[accessToken, searchParams, setSearchParams, token])

  useEffect(() => {
    const handleToken = async (token: any, accessToken: any) => {
      const jwt = isJWT(token) ? token : await Vault.decryptByCryptoKey(token);
      const _accessToken = accessToken ? (isJWT(accessToken) ? accessToken : await Vault.decryptByCryptoKey(accessToken)) : '';
      Vault.removeCryptoKeyFromLocalStorage();
      userStore.setJwt(jwt);
      const vaultUser = await VaultApi.getUser(jwt);
      console.log(`vaultUser: ${{ vaultUser }}`);
      let vaultAppUser = {} as IVaultAppUser;
      try {
        vaultAppUser = await VaultApi.getAppUser(jwt, vaultUser.id);
      } catch (err) {
        console.log(err);
        vaultAppUser = await VaultApi.createAppUser(jwt);
      }
      console.log(`vaultAppUser: ${{ vaultAppUser }}`);
      const compressedPublicKey = ethers.utils.arrayify(ethers.utils.computePublicKey(vaultAppUser.eth_pub_key, true));
      const publicKey = JsBase64.fromUint8Array(compressedPublicKey, true);
      userStore.setVaultAppUser({
        ...vaultAppUser,
        eth_pub_key: publicKey,
        access_token: _accessToken || jwt,
        provider: isJWT(token) ? 'web3' : (vaultUser.mixin ? 'mixin' : 'github')
      });
      try {
        const profileExist = await ProfileApi.exist(userStore.address);
        //const avatar: any = await Base64.getFromBlobUrl(vaultUser.avatar_url || 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png');
        const avatar = 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png';
        if (!profileExist && !isJWT(token)) {
          console.log(`create new: ${useStore.name}`);
          const res = await createActivity({
            type: "Create",
            object: {
              type: "Person",
              id: store('address'),//TODO:来源不明？
              name: vaultUser.display_name,
              image: [{
                type: 'Image',
                mediaType: 'media type',
                content: 'content',
              } as any],
            }
          },undefined,userStore.vaultAppUser.eth_pub_key);
          console.log(res);
        }
        userStore.setProfile({//TODO:为何在if里setProfile
          name: vaultUser.display_name,
          avatar: avatar,
          userAddress: vaultAppUser.eth_address
        });
      } catch (err) {
        console.log(err);
      }
    }
    (async () => {
      try {
        if (token) {
          await handleToken(token, accessToken);
          console.log('token handled');
        }
        if (userStore.isLogin) {
          // const [profile, user] = await Promise.all([
          //   ProfileApi.get(userStore.address),
          //   UserApi.get(userStore.address, {
          //     viewer: userStore.address
          //   })
          // ]);
          const [profile] = await Promise.all([
            ProfileApi.get(userStore.address)
          ]);
          console.log(`1`)
          if (isEmpty(userStore.profile)) {
            userStore.setProfile(profile);
            console.log(`2`)
          }
          //userStore.setUser(userStore.address, user);
          console.log(`user logged in`);
        }

      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [accessToken, token, userStore]);

  return null;
};

export default Preload;