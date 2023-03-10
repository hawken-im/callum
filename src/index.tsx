import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './ErrorPage';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Ok from './Ok';
//import Preload from './preload';


const router = createBrowserRouter([
  // {
  //   path: "/?*",
  //   element: <Preload />,
  //   errorElement:<ErrorPage />
  // },
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />
  },
  {
    path: "/ok",
    element: <Ok />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
