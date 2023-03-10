import React,{ useEffect, useState } from 'react';
import SetTheme from './components/SetTheme';
import ProjectList from './components/ProjectList';
import store from 'store2';
import { getConfig } from './apis';
import * as Vault from './utils/vault';
import { useStore } from './store';

import Avatar from './components/Avatar';
import Preload from './preload';
//import rumsdk from 'rum-sdk-browser';


function App() {
  const [loadingMixin, setLoadingMixin] = useState(false);
  const { userStore } = useStore();
  const [loggedIn,setLoggedIn] = useState(userStore.isLogin);
  
  useEffect(()=>{
    setLoggedIn(userStore.isLogin);
  }, [userStore.isLogin])

  useEffect(() => {
    //TODO: 写一个 navbar 然后用useState+useEffect让navbar可以根据登录情况进行变化
    (async () => {
      const config = await getConfig();
      store('seedUrl', config);
      console.log(`seedUrl stored: ${JSON.stringify(store('seedUrl'))}`)

    })();
  }, []);
  
  return (
    <div className="mt-10 w-[600px] mx-auto">
      <Preload />
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
          }}>
            Mixin Login{loadingMixin && '...'}
          </button>
          <button
          className="btn btn-ghost"
          onClick={async () => {
            store.clear();
            console.log(`store cleared`)
          }}>
            Log Out
          </button>
        </div>
        {loggedIn && <Avatar
          className="cursor-pointer"
          url={userStore.profile.avatar}
          size={60}
        />
        }
        {loggedIn && <div>
          {userStore.profile.name}
        </div>
        }
         <div>
          user: {userStore.profile.name}
        </div>
        <SetTheme />
      </div>
      <div className="divider"></div> 
      <ProjectList />
    </div>
  );
}

export default App;
