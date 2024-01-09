import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.tsx'
import DataContextProvider from './context/DataContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import PaginateTest from './testing/PaginateTest.tsx'
import PaginateTest2 from './testing/PaginateTest2.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      {/* <AuthContextProvider> */}
        {/* <DataContextProvider> */}
          {/* <App /> */}
          {/* <PaginateTest /> */}
          <PaginateTest2 />
        {/* </DataContextProvider> */}
      {/* </AuthContextProvider> */}
    </BrowserRouter>
  // </React.StrictMode>
);
