import React from 'react';

export { default as createUserStore } from './user';

export const CurrentUserContext = React.createContext<any>(null);

export const useCurrentUserContext = () => React.useContext(CurrentUserContext)
