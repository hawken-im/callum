import React,{ useEffect, useState } from 'react';
import SetTheme from './components/SetTheme';
import ProjectList from './components/ProjectList';
import store from 'store2';
import { getConfig } from './apis';
import { ethers } from 'ethers';
import * as Vault from './utils/vault';
import { StoreProvider } from './store';
import Preload from './preload';
//import rumsdk from 'rum-sdk-browser';


function App() {
  const [loadingMixin, setLoadingMixin] = useState(false);

  useEffect(() => {
    (async () => {
      if (!store('address')) {
        const wallet = ethers.Wallet.createRandom();
        const password = "123";
        const keystore = await wallet.encrypt(password, {
          scrypt: {
            N: 64
          }
        });
        store('keystore', keystore.replaceAll('\\', ''));
        store('password', password);
        store('address', wallet.address);
        store('privateKey', wallet.privateKey);
      };

      const config = await getConfig();
      store('seedUrl', config);
      console.log(`seedUrl stored: ${JSON.stringify(store('seedUrl'))}`)

    })();
  }, []);
  
  return (
    <StoreProvider>
    <div className="mt-10 w-[600px] mx-auto">
      <div className="flex justify-between relative">
        <div className="flex items-center text-gray-700 mb-2">
          <img src={`https://ui-avatars.com/api/?name=Hawken+Zed`} alt="avatar" className="w-[32px] h-[32px] rounded-full mr-4" />
          <div>Hawken</div>
          <div className="text-12 text-blue-400 ml-4 cursor-pointer">修改</div>
          <button
          className="btn btn-ghost"
          onClick={async () => {
            setLoadingMixin(true);
            const {
              aesKey,
              keyInHex
            } = await Vault.createKey();
            await Vault.saveCryptoKeyToLocalStorage(aesKey);
            window.location.href = Vault.getMixinOauthUrl({
              state: keyInHex,
              return_to: encodeURIComponent(window.location.href),
              scope: 'PROFILE:READ+COLLECTIBLES:READ'
            });
          }}
        >
          Mixin Login{loadingMixin && '...'}
        </button>
        </div>
        <SetTheme />
      </div>
      <div className="divider"></div> 
      <ProjectList />
    </div>
    </StoreProvider>
  );
}

export default App;
