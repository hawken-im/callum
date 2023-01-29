import React,{ useEffect } from 'react';
import SetTheme from './components/SetTheme';
import SendPost from './components/SendPost';
import { newSocket } from './utils/socket';
//import logo from './logo.svg';


function App() {
  useEffect(() => {
      const socket = newSocket();
      socket.on('connected', msg => console.log(msg));
  });

  return (
    <div className="mt-10 w-[600px] mx-auto">
      <div className="flex justify-between relative">
        <div className="flex items-center text-gray-700 mb-2">
          <img src={`https://ui-avatars.com/api/?name=Hawken+Zed`} alt="avatar" className="w-[32px] h-[32px] rounded-full mr-3" />
          <div>Hawken</div>
          <div className="text-12 text-blue-400 ml-3 cursor-pointer">修改</div>
        </div>
        <SetTheme />
      </div>
      <SendPost />
    </div>
  );
}

export default App;
