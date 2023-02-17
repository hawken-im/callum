import React from 'react';
import { createActivity } from '../apis';
import { useStore } from '../store';
import { ProfileApi, UserApi, VaultApi } from '../apis';

import * as Vault from '../utils/vault';
import { isEmpty } from 'lodash';

import { IVaultAppUser } from '../apis/types';

// import openProfileEditor from 'components/openProfileEditor';
// import openLoginModal from 'components/openLoginModal';

import isJWT from '../utils/isJWT';

//import { useHistory } from 'react-router-dom'; In v6, this app should be rewritten to use the navigate API

import { ethers } from 'ethers';
import * as JsBase64 from 'js-base64';
import store from 'store2';

import { useLocation } from 'react-router-dom';

//TODO: 每次登录都要创造一个新的用户
const Preload = () => {
  const { userStore } = useStore();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const accessToken = new URLSearchParams(search).get('access_token');

  if (token) {
    console.log(`got two tokens: ${token} and ${accessToken}`);
  }

  React.useEffect(() => {

    const handleToken = async (token: any, accessToken: any) => {
      const jwt = isJWT(token) ? token : await Vault.decryptByCryptoKey(token);
      const _accessToken = accessToken ? (isJWT(accessToken) ? accessToken : await Vault.decryptByCryptoKey(accessToken)) : '';
      Vault.removeCryptoKeyFromLocalStorage();
      userStore.setJwt(jwt);
      const vaultUser = await VaultApi.getUser(jwt);
      console.log({ vaultUser });
      let vaultAppUser = {} as IVaultAppUser;
      try {
        vaultAppUser = await VaultApi.getAppUser(jwt, vaultUser.id);
      } catch (err) {
        console.log(err);
        vaultAppUser = await VaultApi.createAppUser(jwt);
      }
      console.log({ vaultAppUser });
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
        if (!profileExist && !isJWT(token)) {
          //const avatar: any = await Base64.getFromBlobUrl(vaultUser.avatar_url || 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png');
          const avatar = 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png';
          const res = await createActivity({
            type: "Create",
            object: {
              type: "Person",
              id: store('address'),//TODO:来源不明？
              name: vaultUser.display_name,
              image: [{
                type: 'Image',
                mediaType: 'TODO',
                content: 'TODO',
              } as any],
            }
          });
          console.log(res);
          userStore.setProfile({
            name: vaultUser.display_name,
            avatar: avatar,
            userAddress: vaultAppUser.eth_address
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    (async () => {
      try {
        if (token) {
          await handleToken(token, accessToken);
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
          if (isEmpty(userStore.profile)) {
            userStore.setProfile(profile);
          }
          //userStore.setUser(userStore.address, user);
          console.log(`user logged in`)
        }

      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  return null;
};

export default Preload;