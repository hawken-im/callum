import { useState } from 'react';
import { createUserStore, CurrentUserContext  } from './store'; 
import ProjectList from './components/ProjectList';

import NavBar from './components/NavBar';
import Preload from './preload';


function App() {
  const [userMe, setUserMe] = useState(createUserStore());
  
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
