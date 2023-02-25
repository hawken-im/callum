import SetTheme from './SetTheme';
import store from 'store2';
import { useCurrentUserContext } from '../store';
import * as Vault from '../utils/vault';

function NavBar() {
  const {userMe} = useCurrentUserContext();

  return (
    <div className="flex justify-between relative">
      <div className="flex items-center text-gray-700 mb-2">
        <img src={userMe.profile.avatar} alt="avatar" className="w-[32px] h-[32px] rounded-full mr-4" />
        <div>Current User: {userMe.profile.name}</div>
        <div className="text-12 text-blue-400 ml-4 cursor-pointer">修改</div>
        <button
          className="btn btn-secondary"
          onClick={async () => {
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
          Mixin Login
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
      <SetTheme />
    </div>
  );
}

export default NavBar;
