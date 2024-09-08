import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/error-page';
import CurrencyRates from './Components/CurrencyRates/CurrencyRates';
import WebSock from './Components/WebSocket/WebSock';
import InfiniteScroll from './Components/Load-more-data/MoreData';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/chat",
        element: <WebSock/>,
      },
      {
        path: "/currency",
        element: <CurrencyRates />,
      },
      {
        path: "/moredata",
        element: <InfiniteScroll />,
      },
    ],
  },
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

