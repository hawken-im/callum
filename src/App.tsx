import React,{ useEffect, useState } from 'react';
import { createUserStore } from './store/user'; 
import ProjectList from './components/ProjectList';
import store from 'store2';
import { useCurrentUserContext, CurrentUserContext } from './store';
import * as Vault from './utils/vault';
import NavBar from './components/NavBar';
import Preload from './preload';
//import rumsdk from 'rum-sdk-browser';


function App() {
  //const userStore = createUserStore();

  const [userMe, setUserMe] = useState(createUserStore());
 // const [loggedIn,setLoggedIn] = useState(userStore.isLogin);

  // useEffect(()=>{
  //   setLoggedIn(userStore.isLogin);
  // }, [userStore.isLogin])

  
  return (
    <div className="mt-10 w-[600px] mx-auto">
      <CurrentUserContext.Provider value={{userMe, setUserMe}}>
        <Preload />
        <NavBar />
        <div className="divider"></div> 
        <ProjectList />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
