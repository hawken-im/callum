import React from 'react';

import { createSnackbarStore } from './snackbar';
import { createConfirmDialogStore } from './confirmDialog';
import { createUserStore } from './user';
import { createSettingStore } from './setting';
import { createConfigStore } from './config';

const storeContext = React.createContext<any>(null);

const createStore = () => ({
  snackbarStore: createSnackbarStore(),
  confirmDialogStore: createConfirmDialogStore(),

  userStore: createUserStore(),

  settingStore: createSettingStore(),
  configStore: createConfigStore(),
});

export interface Store {
  snackbarStore: ReturnType<typeof createSnackbarStore>
  confirmDialogStore: ReturnType<typeof createConfirmDialogStore>

  userStore: ReturnType<typeof createUserStore>

  settingStore: ReturnType<typeof createSettingStore>
  configStore: ReturnType<typeof createConfigStore>
}

export const store = createStore();

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <storeContext.Provider value={store}>{children}</storeContext.Provider>
);

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider');
  }
  //(window as any).toJS = toJS;
  //(window as any).store = store;//stop using window as any 
  return store as Store;
};
